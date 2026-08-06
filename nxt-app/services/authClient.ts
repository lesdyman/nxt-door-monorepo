import { expoClient } from '@better-auth/expo/client'
import { createAuthClient } from 'better-auth/react'
import * as SecureStore from 'expo-secure-store'

import API_URL from '@constants/apiUrl'

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [
    // @ts-expect-error — @better-auth/expo@1.6.26 type bug, do not remove
    expoClient({
      scheme: 'next_door',
      storagePrefix: 'next_door',
      storage: SecureStore,
    }),
  ],
})
