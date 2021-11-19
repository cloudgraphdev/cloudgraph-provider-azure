import { AxiosResponse } from 'axios'
import { URLSearchParams } from 'url'
import { generateAxiosRequest } from './apiUtils'

export default async ({
  clientId,
  clientSecret,
  tenantId,
}: {
  clientId: string
  clientSecret: string
  tenantId: string
}): Promise<AxiosResponse<any>> => {
  const data = new URLSearchParams()
  data.append('grant_type', 'client_credentials')
  data.append('resource', 'https://management.azure.com/')
  data.append('client_id', clientId)
  data.append('client_secret', clientSecret)

  return generateAxiosRequest({
    baseUrl: 'https://login.microsoftonline.com',
    path: `/${tenantId}/oauth2/token`,
    verb: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data.toString(),
  })
}
