import { ScrollView } from 'react-native'

import { useSearch } from '@contexts/SearchContext'
import { useTabBar } from '@contexts/TabBarContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import HomeHeader from '@components/home/HomeHeader'
import InfoBlock from '@components/home/InfoBlock'
import LatestOffers from '@components/home/LatestOffers'
import NeighborsAreLooking from '@components/home/NeighborsAreLooking'
import useColors from '@constants/useColors'

export default function HomeScreen() {
  const colors = useColors()
  const { openSearch } = useSearch()
  const { onScroll } = useTabBar()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <HomeHeader openSearchClick={() => openSearch()} />
      <ScrollView showsVerticalScrollIndicator={false} onScroll={onScroll} scrollEventThrottle={16}>
        <YStack flex={1} gap="$4" pb="$4">
          <InfoBlock />
          <LatestOffers />
          <NeighborsAreLooking />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
