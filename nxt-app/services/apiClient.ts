import { create } from 'axios'

import { authClient } from './authClient'

const apiClient = create()

apiClient.interceptors.request.use((config) => {
  // @ts-expect-error — @better-auth/expo@1.6.26 type bug, do not remove
  const cookie = authClient.getCookie() as string
  if (cookie) {
    config.headers.set('Cookie', cookie)
  }
  return config
})

export default apiClient
