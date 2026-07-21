import { Stack, useLocalSearchParams } from 'expo-router'

import usePostDetails from '@hooks/usePostDetails'

import EditListing from './EditListing'

const EditListingScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: listing } = usePostDetails(Number(id))

  if (!listing) return null

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditListing listing={listing} />
    </>
  )
}

export default EditListingScreen
