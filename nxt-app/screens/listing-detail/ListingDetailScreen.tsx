import { Stack, useLocalSearchParams } from 'expo-router'

import usePostDetails from '@hooks/usePostDetails'

import ListingDetail from './ListingDetail'

const ListingDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: listing, isLoading } = usePostDetails(Number(id))

  if (isLoading || !listing) return null

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ListingDetail listing={listing} />
    </>
  )
}

export default ListingDetailScreen
