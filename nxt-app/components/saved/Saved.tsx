import { ScrollView } from 'react-native'

import { useRouter } from 'expo-router'
import { Heart } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import BackHeader from '@components/shared/BackHeader'
import useColors from '@constants/useColors'

import mockListings from '../../data/mockListings'
import savedListingIds from '../../data/savedListingIds'
import SavedListingCard from './components/SavedListingCard'

const Saved = () => {
  const colors = useColors()
  const router = useRouter()
  const savedListings = mockListings.filter((listing) => savedListingIds.includes(listing.id))

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader title="Saved" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {savedListings.length > 0 ? (
          <YStack px="$4">
            {savedListings.map((listing) => (
              <SavedListingCard
                key={listing.id}
                listing={listing}
                onPress={() => router.push(`/listing/${listing.id}`)}
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
