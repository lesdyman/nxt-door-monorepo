import { Stack } from 'expo-router'

import Saved from '@components/saved/Saved'

export default function SavedScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Saved />
    </>
  )
}
