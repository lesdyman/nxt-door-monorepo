import { Stack, useLocalSearchParams } from 'expo-router'

import mockListings from '../../data/mockListings'
import ListingDetail from './ListingDetail'

const ListingDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const listing = mockListings.find((l) => l.id === Number(id))

  if (!listing) return null

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ListingDetail listing={listing} />
    </>
  )
}

export default ListingDetailScreen
