import { Stack } from 'expo-router'

import InfoCenter from '@screens/info-center/InfoCenter'

export default function InfoCenterScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <InfoCenter />
    </>
  )
}
