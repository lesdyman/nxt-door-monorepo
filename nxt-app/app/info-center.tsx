import { Stack } from 'expo-router'

import InfoCenter from '@components/info-center/InfoCenter'

export default function InfoCenterScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <InfoCenter />
    </>
  )
}
