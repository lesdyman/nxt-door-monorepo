import { Stack, useLocalSearchParams } from 'expo-router'

import useListingDetails from '@hooks/useListingDetails'

import EditListing from './EditListing'

const EditListingScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: listing } = useListingDetails(Number(id))

  if (!listing) return null

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditListing listing={listing} />
    </>
  )
}

export default EditListingScreen
