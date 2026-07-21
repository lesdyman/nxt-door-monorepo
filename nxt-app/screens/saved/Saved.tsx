import { ScrollView } from 'react-native'

import { useRouter } from 'expo-router'
import { Heart } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import BackHeader from '@components/BackHeader'
import Loader from '@components/Loader'
import useColors from '@constants/useColors'
import useCurrentUser from '@hooks/useCurrentUser'
import useSavedListings from '@hooks/useSavedListings'
import savedListingsService from '@services/savedListingsService'

import SavedListingCard from './components/SavedListingCard'

const Saved = () => {
  const colors = useColors()
  const router = useRouter()
  const { user } = useCurrentUser()

  const { data: savedListings, isLoading, refetch } = useSavedListings(user?.id)
  const savedListingsWithListing = (savedListings ?? []).filter((item) => !!item.listing)

  const handleDelete = async (savedListingId: number) => {
    if (!user) return
    await savedListingsService.removeListingFromSaved(savedListingId, user.id)
    await refetch()
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader title="Saved" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <YStack flex={1} items="center" justify="center" py="$8">
            <Loader size={32} colorPrimary={colors.brand} colorSecondary={colors.amber} />
          </YStack>
        ) : savedListingsWithListing.length > 0 ? (
          <YStack px="$4">
            {savedListingsWithListing.map((savedListing) => (
              <SavedListingCard
                key={savedListing.id}
                listing={savedListing.listing!}
                onPress={() => router.push(`/listing/${savedListing.listing!.id}`)}
                onDelete={() => handleDelete(savedListing.id)}
              />
            ))}
          </YStack>
        ) : (
          <YStack flex={1} items="center" justify="center" gap="$2" px="$4" py="$12">
            <Heart color={colors.textSecondary} size={32} />
            <Text color={colors.textSecondary} fontSize={15} text="center">
              No saved items yet
            </Text>
          </YStack>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Saved
