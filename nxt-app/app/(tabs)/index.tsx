import { useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'

import { useQueryClient } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import useColors from '@constants/useColors'
import { useSearch } from '@contexts/SearchContext'
import { useTabBar } from '@contexts/TabBarContext'
import HomeHeader from '@screens/home/HomeHeader'
import InfoBlock from '@screens/home/InfoBlock'
import LatestOffers from '@screens/home/LatestOffers'
import NeighborsAreLooking from '@screens/home/NeighborsAreLooking'

import places from '../../data/places'

export default function HomeScreen() {
  const colors = useColors()
  const { openSearch } = useSearch()
  const { onScroll } = useTabBar()
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await queryClient.invalidateQueries({ queryKey: ['listings'] })
    setRefreshing(false)
  }

  const place = places[0]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <HomeHeader openSearchClick={() => openSearch()} placeName={place.name} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.brand}
          />
        }
      >
        <YStack flex={1} gap="$4" pb="$4">
          <InfoBlock place={place} />
          <LatestOffers />
          <NeighborsAreLooking />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
