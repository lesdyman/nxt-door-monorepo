import { useMemo, useState } from 'react'
import { ScrollView } from 'react-native'

import { useRouter } from 'expo-router'
import { PackageOpen } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import BackHeader from '@components/BackHeader'
import useColors from '@constants/useColors'
import { useAuth } from '@contexts/AuthContext'
import useConfirmDeleteListing from '@hooks/useConfirmDeleteListing'
import useListings from '@hooks/useListings'

import MyListingCard from './components/MyListingCard'
import SearchBar from './components/SearchBar'

const MyListings = () => {
  const colors = useColors()
  const router = useRouter()
  const [search, setSearch] = useState('')

  const { userId } = useAuth()

  const { data: userListings } = useListings({ userId: userId || undefined, limit: 100 })
  const { confirmDelete } = useConfirmDeleteListing()

  const myListings = useMemo(
    () =>
      (userListings ?? [])
        .filter((listing) => listing.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
    [userListings, search]
  )

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader title="My Posts" />
      <YStack py="$2" flex={1}>
        <SearchBar search={search} setSearch={setSearch} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {myListings.length > 0 ? (
            <YStack gap="$3" px="$4" py="$4">
              {myListings.map((listing) => (
                <MyListingCard
                  key={listing.id}
                  listing={listing}
                  onEdit={() => router.push(`/edit-listing/${listing.id}`)}
                  onPromote={() => {}}
                  onDelete={() => confirmDelete(listing.id)}
                />
              ))}
            </YStack>
          ) : (
            <YStack flex={1} items="center" justify="center" gap="$2" px="$4" py="$12">
              <PackageOpen color={colors.textSecondary} size={32} />
              <Text color={colors.textSecondary} fontSize={15} text="center">
                No posts yet
              </Text>
            </YStack>
          )}
        </ScrollView>
      </YStack>
    </SafeAreaView>
  )
}

export default MyListings
