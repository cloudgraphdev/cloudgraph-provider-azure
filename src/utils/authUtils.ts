import { ConfidentialClientApplication } from '@azure/msal-node'
import { AxiosResponse } from 'axios'
import { URLSearchParams } from 'url'
import { AzureServiceConfig } from '../types'
import { generateAxiosRequest } from './apiUtils'

export const getAadTokenViaAxios = async ({
  clientId,
  clientSecret,
  tenantId,
}: {
  clientId: string
  clientSecret: string
  tenantId: string
}): Promise<AxiosResponse<string>> => {
  const data = new URLSearchParams()
  data.append('grant_type', 'client_credentials')
  data.append('resource', 'https://management.azure.com/')
  data.append('client_id', clientId)
  data.append('client_secret', clientSecret)

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
}

export const getAadTokenViaMsal = async ({
  clientId,
  tenantId,
  clientSecret,
}: AzureServiceConfig): Promise<{
  result: any
  getToken: () => Promise<any>
}> => {
  const cca = new ConfidentialClientApplication({
    auth: {
      clientId,
      authority: `https://login.microsoftonline.com/${tenantId}`,
      clientSecret,
    },
  })
  async function getToken(): Promise<any> {
    return cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    })
  }
  return {
    result: (await getToken())?.access_token,
    getToken,
  }
}
