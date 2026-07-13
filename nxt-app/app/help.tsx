import { Stack } from 'expo-router'

import Help from '@components/help/Help'

export default function HelpScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Help />
    </>
  )
}
