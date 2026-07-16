import { Stack, useLocalSearchParams } from 'expo-router'

import mockListings from '../../data/mockListings'
import EditListing from './EditListing'

const EditListingScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const listing = mockListings.find((l) => l.id === Number(id))

  if (!listing) return null

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditListing listing={listing} />
    </>
  )
}

export default EditListingScreen
