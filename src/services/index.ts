import CloudGraph, { Service, Opts, ProviderData } from '@cloudgraph/sdk'
import { TokenCredential } from '@azure/core-http'
import { ClientSecretCredential } from '@azure/identity'
import { Subscription, SubscriptionClient } from '@azure/arm-subscriptions'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import chalk from 'chalk'
import { print } from 'graphql'
import { isEmpty, merge, unionBy } from 'lodash'
import path from 'path'

import regions from '../enums/regions'
import resources from '../enums/resources'
import serviceMap from '../enums/serviceMap'
import schemasMap from '../enums/schemasMap'
import services from '../enums/services'
import {
  AzureCredentials,
  AzureConfig,
  rawDataInterface,
  AzureServiceInput,
} from '../types'
import {
  DEFAULT_REGION,
  DEFAULT_RESOURCES,
  GLOBAL_REGION,
} from '../config/constants'
import { obfuscateSensitiveString } from '../utils/format'
import { sortResourcesDependencies } from '../utils'
import { createDiffSecs } from '../utils/dateutils'
import {
  getClientSecretCredentials,
  getTokenCredentials,
} from '../utils/authUtils'
import enhancers, { EnhancerConfig } from './base/enhancers'

export const enums = {
  services,
  regions,
  resources,
  schemasMap,
}

const selectableRegionsList = regions.filter(i => i !== GLOBAL_REGION)

export const getSubscriptions = async (
  creds: ClientSecretCredential
): Promise<Subscription[]> => {
  const client = new SubscriptionClient(creds)
  const subscriptions: Subscription[] = []
  const subsIterable = client.subscriptions.list()
  for await (const sub of subsIterable) {
    if (sub) {
      subscriptions.push(sub)
    }
  }
  return subscriptions
}

export default class Provider extends CloudGraph.Client {
  constructor(config: any) {
    super(config)
    this.properties = enums
  }

  private credentials: ClientSecretCredential | undefined

  private subscriptions: string[]

  private properties: {
    services: { [key: string]: string }
    regions: string[]
    resources: { [key: string]: string }
  }

  async askForAzureCredentials(): Promise<AzureCredentials> {
    return this.interface.prompt([
      {
        type: 'input',
        message: 'Please input a valid tenant ID: ',
        name: 'tenantId',
      },
      {
        type: 'input',
        message: 'Please input a valid subscription ID: ',
        name: 'subscriptionId',
      },
      {
        type: 'input',
        message: 'Please input a valid client ID: ',
        name: 'clientId',
      },

      {
        type: 'input',
        message: 'Please input a valid client secret: ',
        name: 'clientSecret',
      },
    ])
  }

  logSelectedAccessRegionsAndResources(
    subscriptionsToLog: string[],
    regionsToLog: string,
    resourcesToLog: string
  ): void {
    this.logger.info(
      `Subscriptions configured: ${chalk.green(subscriptionsToLog.join(', '))}`
    )
    this.logger.info(
      `Regions configured: ${chalk.green(regionsToLog.replace(/,/g, ', '))}`
    )
    this.logger.info(
      `Resources configured: ${chalk.green(resourcesToLog.replace(/,/g, ', '))}`
    )
  }

  async getFullCredentialsAndSubscriptions(creds: AzureCredentials): Promise<{
    subscriptions: string[]
    credentials: ClientSecretCredential
    tokenCredentials: TokenCredential
  }> {
    const credentials = getClientSecretCredentials(creds)
    const tokenCredentials = await getTokenCredentials(credentials, creds)
    const subList = await getSubscriptions(credentials)
    const subscription = subList.find(({ id }) => id === creds.subscriptionId)
    if (isEmpty(subList) && !subscription) {
      this.logger.debug(
        `${chalk.red('AUTH ERROR')}: clientId ${chalk.green(
          creds.clientId
        )} doesn't have enough permission to fetch resources from ${chalk.green(
          creds.subscriptionId
        )} subscription`
      )
      throw Error()
    }
    const subscriptions = subscription
      ? [subscription.subscriptionId]
      : subList.map(s => s.subscriptionId)

    return {
      subscriptions,
      credentials,
      tokenCredentials,
    }
  }

  private printAzureCredentials(creds: AzureCredentials): void {
    this.logger.success(
      `tenantId: ${chalk.underline.green(
        obfuscateSensitiveString(creds.tenantId)
      )}`
    )
    this.logger.success(
      `subscriptionIds: ${
        this.subscriptions.length > 1
          ? this.subscriptions.join(', ')
          : this.subscriptions[0]
      }`
    )
    this.logger.success(
      `clientId: ${chalk.underline.green(
        obfuscateSensitiveString(creds.clientId)
      )}`
    )
    this.logger.success(
      `clientSecret: ${chalk.underline.green(
        obfuscateSensitiveString(creds.clientSecret)
      )}`
    )
  }

  async configure(): Promise<{ [key: string]: any }> {
    const { flags = {}, cloudGraphConfig, ...providerSettings } = this.config
    const result: { [key: string]: any } = { ...providerSettings }
    const accounts: AzureCredentials[] = []

    /**
     * Multi subscription setup flow
     */
    while (true) {
      if (accounts.length > 0) {
        const { addSubscription } = await this.interface.prompt([
          {
            type: 'confirm',
            message: 'Configure another Azure subscription?',
            name: 'addSubscription',
            default: true,
          },
        ])
        if (!addSubscription) {
          break
        }
      }
      const {
        clientId,
        tenantId,
        clientSecret,
        subscriptionId,
      }: AzureCredentials = await this.askForAzureCredentials()
      if (clientId && tenantId && clientSecret && subscriptionId) {
        accounts.push({
          clientId,
          tenantId,
          clientSecret,
          subscriptionId,
        })
      }
    }

    if (!accounts.length) {
      accounts.push({ clientId: '', tenantId: '', clientSecret: '' })
    }

    result.accounts = accounts

    const { regions: regionsAnswer = [] } = await this.interface.prompt([
      {
        type: 'checkbox',
        message: 'Select regions to scan',
        loop: false,
        name: 'regions',
        choices: selectableRegionsList.map((region: string) => ({
          name: region,
        })),
      },
    ])
    this.logger.debug(`Regions selected: ${regionsAnswer}`)
    // Always add global region to ensure that services that don't have location information get filtered
    regionsAnswer.push(GLOBAL_REGION)
    if (regionsAnswer.length === 1) {
      this.logger.info(
        `No Regions selected, using default region: ${chalk.green(
          DEFAULT_REGION
        )}`
      )
      regionsAnswer.push(DEFAULT_REGION)
    }
    result.regions = regionsAnswer.join(',')

    // Prompt for resources if flag set
    if (flags.resources) {
      const { resources: resourcesAnswer } = await this.interface.prompt([
        {
          type: 'checkbox',
          message: 'Select services to scan',
          loop: false,
          name: 'resources',
          choices: Object.values(services as { [key: string]: string }).map(
            (service: string) => ({
              name: service,
            })
          ),
        },
      ])
      this.logger.debug(resourcesAnswer)
      if (resourcesAnswer.length > 0) {
        result.resources = resourcesAnswer.join(',')
      } else {
        result.resources = DEFAULT_RESOURCES
      }
    } else {
      result.resources = DEFAULT_RESOURCES
    }
    const confettiBall = String.fromCodePoint(0x1f38a) // confetti ball emoji
    this.logger.success(
      `${confettiBall} ${chalk.green(
        'Azure'
      )} configuration successfully completed ${confettiBall}`
    )
    this.logSelectedAccessRegionsAndResources(
      result.accounts.map(acct => acct.roleArn ?? acct.profile),
      result.regions,
      result.resources
    )

    return result
  }

  private getAzureConfig(creds: AzureCredentials): Promise<AzureConfig> {
    return new Promise(async resolveConfig => {
      // If we have keys set in the config file, just use them
      if (creds.clientId && creds.tenantId && creds.clientSecret) {
        if (!this.credentials) {
          this.printAzureCredentials(creds)
        }
        const { credentials, subscriptions } =
          await this.getFullCredentialsAndSubscriptions(creds)
        this.credentials = credentials
        this.subscriptions = subscriptions
        resolveConfig({ credentials, subscriptions })
      }
      // If the client instance has creds set, weve gone through this function before.. just reuse them
      if (this.credentials && this.subscriptions) {
        resolveConfig({
          credentials: this.credentials,
          subscriptions: this.subscriptions,
        })
      }
      let credentialsObj
      // Here we are going to list the different ways we can search valid credentials and options
      //
      if (!this.credentials) {
        this.logger.info(
          'No Azure Credentials found, please enter them manually'
        )
        // when pausing the ora spinner the position of this call must come after any logger output
        const msg = this.logger.stopSpinner()
        const {
          clientId,
          tenantId,
          clientSecret,
          subscriptionId,
        }: AzureCredentials = await this.askForAzureCredentials()
        if (clientId && tenantId && clientSecret) {
          credentialsObj = {
            clientId,
            tenantId,
            clientSecret,
            subscriptionId,
          }
          const { credentials, subscriptions } =
            await this.getFullCredentialsAndSubscriptions(credentialsObj)
          this.credentials = credentials
          this.subscriptions = subscriptions
        } else {
          this.logger.error('Cannot scan Azure without credentials')
          throw new Error()
        }
        this.logger.startSpinner(msg)
      }
      this.printAzureCredentials(credentialsObj)
      resolveConfig({
        credentials: this.credentials,
        subscriptions: this.subscriptions,
      })
    })
  }

  /**
   * getSchema is used to get the schema for provider
   * @returns A string of graphql sub schemas
   */
  getSchema(): string {
    const typesArray = loadFilesSync(path.join(__dirname), {
      recursive: true,
      extensions: ['graphql'],
    })
    return print(mergeTypeDefs(typesArray))
  }

  /**
   * Factory function to return Azure service classes based on input service
   * @param service an Azure service that is listed within the service map (current supported services)
   * @returns Instance of an Azure service class to interact with that Azure service
   */
  private getService(service: string): Service {
    if (serviceMap[service]) {
      return new serviceMap[service](this)
    }
  }

  private async getResourcesData({
    config,
    opts,
    configuredResources,
    configuredRegions,
    initialRawData = [],
  }: {
    config: {
      tokenCredentials: TokenCredential
      credentials: ClientSecretCredential
      subscriptionId: string
    }
    opts
    configuredResources: string
    configuredRegions: string
    initialRawData?: rawDataInterface[]
  }): Promise<rawDataInterface[]> {
    const getDataInputData = (
      rawData: rawDataInterface[]
    ): AzureServiceInput => ({
      regions: configuredRegions,
      config,
      opts,
      rawData,
    })
    // For the main loop
    // we need to pass the essential resources data
    // to be able to use rawData for children services
    const result: rawDataInterface[] = initialRawData
    const resourceNames: string[] = sortResourcesDependencies([
      ...new Set<string>(configuredResources.split(',')),
    ])
    for (const resource of resourceNames) {
      const serviceClass = this.getService(resource)
      if (serviceClass && serviceClass.getData) {
        const startDate = new Date()
        const data = await serviceClass.getData(getDataInputData(result))
        result.push({
          name: resource,
          subscriptionId: config.subscriptionId,
          data,
        })
        this.logger.success(
          `${resource} scan completed in ${createDiffSecs(startDate)}s`
        )
      } else {
        this.logger.warn(
          `Skipping service ${resource} as there was an issue getting data for it. Is it currently supported?`
        )
      }
    }
    return result
  }

  private async getRawData(
    account: AzureCredentials,
    opts?: Opts
  ): Promise<rawDataInterface[]> {
    let { regions: configuredRegions, resources: configuredResources } =
      this.config
    const result: rawDataInterface[] = []
    const essentialResourcesList = [services.resourceGroup].join(',')
    const allServices = Object.values(this.properties.services)
    const restOfServices = allServices
      .filter(i => !essentialResourcesList.includes(i))
      .join(',')
    if (!configuredRegions) {
      configuredRegions = this.properties.regions.join(',')
    } else {
      configuredRegions = [...new Set(configuredRegions.split(','))].join(',')
    }
    if (!configuredResources) {
      configuredResources = Object.values(restOfServices).join(',')
    }
    const { subscriptionId } = account
    try {
      const { tokenCredentials, credentials } =
        await this.getFullCredentialsAndSubscriptions(account)
      const config = {
        ...account,
        tokenCredentials,
        credentials,
        subscriptionId,
      }
      // Get essential services first and push them
      result.push(
        ...(await this.getResourcesData({
          config,
          opts,
          configuredResources: essentialResourcesList,
          configuredRegions,
        }))
      )
      result.push(
        ...(await this.getResourcesData({
          config,
          opts,
          configuredResources,
          configuredRegions,
          initialRawData: result, // we pass scanned essential resources as rawData
        }))
      )
      this.logger.success(`Subscription: ${subscriptionId} scan completed`)
    } catch (error: any) {
      this.logger.debug(error)
      this.logger.error(
        `There was an error scanning Azure sdk data for subscription ${chalk.green(
          subscriptionId
        )}`
      )
    }
    return result
  }

  private enhanceData({ data, ...config }: EnhancerConfig): ProviderData {
    let enhanceData = {
      entities: data.entities,
      connections: data.connections,
    }
    for (const { name, enhancer } of enhancers) {
      try {
        enhanceData = enhancer({ ...config, data: enhanceData })
      } catch (error: any) {
        this.logger.error(
          `There was an error enriching Azure data with ${name} data`
        )
        this.logger.debug(error)
        return enhanceData
      }
    }

    return enhanceData
  }

  /**
   * getData is used to fetch all provider data specified in the config for the provider
   * @param opts: A set of optional values to configure how getData works
   * @returns Promise<any> All provider data
   */
  async getData({ opts }: { opts: Opts }): Promise<ProviderData> {
    const result: ProviderData = {
      entities: [],
      connections: {},
    }
    let { regions: configuredRegions, resources: configuredResources } =
      this.config
    const { accounts: configuredAccounts }: { accounts: AzureCredentials[] } =
      this.config
    if (!configuredRegions) {
      configuredRegions = this.properties.regions.join(',')
    } else {
      configuredRegions = [...new Set(configuredRegions.split(','))].join(',')
    }
    if (!configuredResources) {
      configuredResources = Object.values(this.properties.services).join(',')
    }

    // const usingEnvCreds = !!process.env.Azure_ACCESS_KEY_ID

    // this.logSelectedAccessRegionsAndResources(
    //   usingEnvCreds
    //     ? [ENV_VAR_CREDS_LOG]
    //     : configuredAccounts.map(acct => {
    //         return acct.subscriptionId
    //       }),
    //   configuredRegions,
    //   configuredResources
    // )

    this.logSelectedAccessRegionsAndResources(
      configuredAccounts.map(acct => {
        return acct.subscriptionId
      }),
      configuredRegions,
      configuredResources
    )

    let rawData: rawDataInterface[] = []
    const tagRegion = GLOBAL_REGION
    const tags = { name: 'tag', data: { [tagRegion]: [] } }
    const subscriptions = {
      className: 'AzureSubscription',
      name: 'subscription',
      data: { [GLOBAL_REGION]: [] },
    }
    for (const account of configuredAccounts) {
      const newRawData = await this.getRawData(account, opts)
      rawData = [...rawData, ...newRawData]
      subscriptions.data[GLOBAL_REGION].push({
        id: account.subscriptionId,
        regions: configuredRegions.split(','),
      })
    }

    // Handle global tag entities
    try {
      for (const { data: entityData } of rawData) {
        for (const region of Object.keys(entityData)) {
          const dataAtRegion = entityData[region]
          dataAtRegion.forEach(singleEntity => {
            if (!isEmpty(singleEntity.Tags)) {
              for (const [key, value] of Object.entries(singleEntity.Tags)) {
                if (
                  !tags.data[tagRegion].find(
                    ({ id }) => id === `${key}:${value}`
                  )
                ) {
                  tags.data[tagRegion].push({
                    id: `${key}:${value}`,
                    key,
                    value,
                  })
                }
              }
            }
          })
        }
      }
      const existingTagsIdx = rawData.findIndex(({ name }) => {
        return name === 'tag'
      })
      if (existingTagsIdx > -1) {
        rawData[existingTagsIdx] = tags
      } else {
        rawData.push(tags)
      }
    } catch (error: any) {
      this.logger.error('There was an error aggregating Azure tags')
      this.logger.debug(error)
    }

    try {
      for (const serviceData of rawData) {
        const serviceClass = this.getService(serviceData.name)
        const entities: any[] = []
        for (const region of Object.keys(serviceData.data)) {
          const data = serviceData.data[region]
          if (!isEmpty(data)) {
            data.forEach((service: any) => {
              const formattedData = serviceClass.format({
                service,
                region,
                account: serviceData.subscriptionId,
              })
              entities.push(formattedData)
              if (typeof serviceClass.getConnections === 'function') {
                // We need to loop through all configured regions here because services can be connected to things in another region
                let serviceConnections = {}
                for (const connectionRegion of configuredRegions.split(',')) {
                  // Use merged raw data for connections so we can connect across accounts
                  const newConnections = serviceClass.getConnections({
                    service,
                    region: connectionRegion,
                    account: serviceData.subscriptionId,
                    data: rawData,
                  })
                  // IF we have no pre existing connections for this service, use new connections
                  // IF we have pre existing connections, check if its for the same serivce id, if so
                  // check if the connections list for that id is empty, use new connections for that id if so.
                  // otherwise, merge connections by unioning on id of the connections
                  if (!isEmpty(serviceConnections)) {
                    const entries: [string, any][] =
                      Object.entries(newConnections)
                    for (const [key] of entries) {
                      // If there are no service connections for this entity i.e. { [serviceId]: [] }
                      // use new connections for that key
                      if (serviceConnections[key]) {
                        if (isEmpty(serviceConnections[key])) {
                          serviceConnections[key] = newConnections[key] ?? []
                        } else {
                          serviceConnections[key] = unionBy(
                            serviceConnections[key],
                            newConnections[key] ?? [],
                            'id'
                          )
                        }
                      } else {
                        serviceConnections = {
                          ...serviceConnections,
                          ...newConnections,
                        }
                      }
                    }
                  } else {
                    serviceConnections = newConnections
                  }
                }
                result.connections = {
                  ...result.connections,
                  ...serviceConnections,
                }
              }
            })
          }
        }
        /**
         * we have 2 things to check here, both dealing with multi-account scenarios
         * 1. Do we already have an entity by this name in the result
         * 2. Do we already have the data for an entity that lives in multiple accounts
         * If so, we need to merge the data. We use lodash merge to recursively merge arrays as there are
         * cases where acct A gets more data for service obj X than acct B does.
         */
        const existingServiceIdx = result.entities.findIndex(({ name }) => {
          return name === serviceData.name
        })
        if (existingServiceIdx > -1) {
          const existingData = result.entities[existingServiceIdx].data
          for (const currentEntity of entities) {
            const existingEntityIdx = existingData.findIndex(
              ({ id }) => id === currentEntity.id
            )
            if (existingEntityIdx > -1) {
              const entityToDelete = existingData[existingEntityIdx]
              existingData.splice(existingEntityIdx, 1)
              const entityToMergeIdx = entities.findIndex(
                ({ id }) => id === currentEntity.id
              )
              entities[entityToMergeIdx] = merge(entityToDelete, currentEntity)
            }
          }
          result.entities[existingServiceIdx] = {
            name: serviceData.name,
            mutation: serviceClass.mutation,
            data: [...existingData, ...entities],
          }
        } else {
          result.entities.push({
            name: serviceData.name,
            mutation: serviceClass.mutation,
            data: entities,
          })
        }
      }
    } catch (error: any) {
      this.logger.error(
        'There was an error building connections for Azure data'
      )
      this.logger.debug(error)
    }

    return this.enhanceData({
      subscriptions: subscriptions.data[GLOBAL_REGION],
      configuredRegions,
      rawData,
      data: result,
    })
  }
}
