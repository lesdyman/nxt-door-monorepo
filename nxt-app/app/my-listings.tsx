import { Stack } from 'expo-router'

import MyListings from '@components/my-listings/MyListings'

export default function MyListingsScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MyListings />
    </>
  )
}
