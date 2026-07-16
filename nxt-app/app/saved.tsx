import { Stack } from 'expo-router'

import Saved from '@screens/saved/Saved'

export default function SavedScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Saved />
    </>
  )
}
