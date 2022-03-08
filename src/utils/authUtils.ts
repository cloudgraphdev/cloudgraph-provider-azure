import CloudGraph from '@cloudgraph/sdk'
import {
  AccessToken,
  ClientSecretCredential,
  TokenCredential,
} from '@azure/identity'
import { ConfidentialClientApplication } from '@azure/msal-node'
import { URLSearchParams } from 'url'
import { AuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/IAuthenticationProvider'
import { AzureCredentials, AzureServiceConfig } from '../types'
import { generateAxiosRequest } from './apiUtils'

const { logger } = CloudGraph

export const getAadTokenViaAxios = async ({
  clientId,
  clientSecret,
  tenantId,
}: AzureServiceConfig): Promise<string> => {
  const data = new URLSearchParams()
  data.append('grant_type', 'client_credentials')
  data.append('resource', 'https://management.azure.com/')
  data.append('client_id', clientId)
  data.append('client_secret', clientSecret)

  try {
    const response = await generateAxiosRequest({
      baseUrl: 'https://login.microsoftonline.com',
      path: `/${tenantId}/oauth2/token`,
      verb: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data.toString(),
    })
    const { access_token: authToken = '' } = response?.data || {}
    return authToken
  } catch (error) {
    logger.debug('Error fetching AAD Token!')
    logger.debug(error)
    logger.debug(data)
  }
}

export const getAuthProviderViaMsalForGraph = async (
  { clientId, tenantId, clientSecret }: AzureServiceConfig,
  scopes: string[]
): Promise<AuthenticationProvider> => {
  const cca = new ConfidentialClientApplication({
    auth: {
      clientId,
      authority: `https://login.microsoftonline.com/${tenantId}`,
      clientSecret,
    },
  })
  return {
    getAccessToken: async (): Promise<string> => {
      const { accessToken } = await cca.acquireTokenByClientCredential({
        scopes,
      })
      return accessToken
    },
  }
}

export const getClientSecretCredentials = (
  credentials: AzureCredentials
): ClientSecretCredential => {
  const { tenantId, clientId, clientSecret } = credentials
  return new ClientSecretCredential(tenantId, clientId, clientSecret)
}

export const getTokenCredentials = async (
  clientSecretCredentials: ClientSecretCredential,
  { tenantId }: AzureCredentials
): Promise<TokenCredential> => {
  return {
    getToken: async (): Promise<AccessToken | null> => {
      const { token, expiresOnTimestamp } =
        await clientSecretCredentials.getToken(
          'https://management.azure.com/.default',
          {
            tenantId,
          }
        )
      return { token, expiresOnTimestamp }
    },
  }
}
