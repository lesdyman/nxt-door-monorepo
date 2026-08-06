import { Stack } from 'expo-router'

import Auth from '@screens/auth/Auth'

export default function AuthScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Auth />
    </>
  )
}
