import { Stack } from 'expo-router'

import Help from '@screens/help/Help'

export default function HelpScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Help />
    </>
  )
}
