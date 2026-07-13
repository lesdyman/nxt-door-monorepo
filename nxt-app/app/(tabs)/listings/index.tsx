import { ScrollView } from 'react-native'

import { useTabBar } from '@contexts/TabBarContext'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import FilterBar from '@components/shared/FilterBar/FilterBar'
import Header from '@components/shared/Header'
import Post from '@components/shared/Post/Post'
import TabHeader from '@components/shared/TabHeader'
import useColors from '@constants/useColors'

import mockListings from '../../../data/mockListings'

export default function ListingsScreen() {
  const colors = useColors()
  const router = useRouter()
  const { onScroll } = useTabBar()
  const listings = mockListings
    .filter((post) => post.side === 'offer')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <Header>
        <TabHeader title="All Offers" searchFilter="Offers only" />
      </Header>
      <YStack pt="$3" flex={1}>
        <FilterBar />
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <YStack gap="$3" px="$4" pb={20}>
            {listings.map((listing) => (
              <Post
                key={listing.id}
                data={listing}
                onPress={() => router.push(`/listings/${listing.id}`)}
              />
            ))}
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  )
}
