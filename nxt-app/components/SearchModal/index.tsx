import { useRef, useState } from 'react'
import { ScrollView } from 'react-native'

import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import useColors from '@constants/useColors'
import { useSearch } from '@contexts/SearchContext'
import SearchField from '@screens/home/SearchField'

import CloseSearchBtn from './components/CloseSearchBtn'
import PopularCategories from './components/PopularCategories'
import QuickFilters from './components/QuickFilters'
import RecentSearches from './components/RecentSearches'
import TrendingCard from './components/TrendingCard'

const SearchModal = () => {
  const colors = useColors()
  const { isSearchOpen, closeSearch } = useSearch()
  const insets = useSafeAreaInsets()
  const [scrollOffset, setScrollOffset] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)

  return (
    <Modal
      isVisible={isSearchOpen}
      onSwipeComplete={closeSearch}
      swipeDirection="down"
      onBackButtonPress={closeSearch}
      style={{ margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe={true}
      scrollTo={(p) => scrollViewRef.current?.scrollTo(p)}
      scrollOffset={scrollOffset}
      scrollOffsetMax={600}
    >
      <YStack
        flex={1}
        gap="$8"
        px="$4"
        style={{ backgroundColor: colors.background, paddingTop: insets.top }}
      >
        <SearchField />
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
          contentContainerStyle={{ gap: 32 }}
        >
          <YStack gap="$8" pb={120}>
            <RecentSearches />
            <PopularCategories />
            <QuickFilters />
            <TrendingCard />
          </YStack>
        </ScrollView>
      </YStack>

      <CloseSearchBtn onClose={closeSearch} />
    </Modal>
  )
}

export default SearchModal
