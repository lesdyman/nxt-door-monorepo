import { useEffect } from 'react'
import { ScrollView } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'
import { useTabBarSafe } from '@contexts/TabBarContext'

import Actions from './components/Actions'
import AmountCategory from './components/AmountCategory'
import AuthorBlock from './components/AuthorBlock'
import DetailsHeader from './components/DetailsHeader'
import ImageCarousel from './components/ImageCarousel'
import ListingMap from './components/ListingMap'
import TitleBlock from './components/TitleBlock'

interface Props {
  listing: Listing
}

const ListingDetail: React.FC<Props> = ({ listing }) => {
  const colors = useColors()
  const tabBar = useTabBarSafe()

  useEffect(() => {
    tabBar?.hide()
    return () => tabBar?.show()
  }, [tabBar])

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <DetailsHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageCarousel images={listing.images} category={listing.category} />
        <YStack gap="$4" px="$4" pt="$4" pb="$4">
          <TitleBlock
            titleData={{
              title: listing.title,
              price: listing.price,
              side: listing.side,
              updatedAt: listing.updatedAt,
            }}
          />
          <AuthorBlock postAuthorId={listing.userId} />

          <Text color={colors.textMuted} fontSize={16} lineHeight={26} letterSpacing={0.12}>
            {listing.description}
          </Text>

          <AmountCategory
            data={{ amountAvailable: listing.amountAvailable, category: listing.category }}
          />

          <YStack gap="$2">
            <Text
              fontSize={16}
              fontWeight="500"
              color={colors.textMuted}
              lineHeight={20}
              letterSpacing={0.12}
            >
              Prefered Pick Up Location
            </Text>
            <ListingMap
              latitude={listing.location.latitude}
              longitude={listing.location.longitude}
            />
          </YStack>
        </YStack>
      </ScrollView>
      <Actions listing={listing} />
    </SafeAreaView>
  )
}

export default ListingDetail
