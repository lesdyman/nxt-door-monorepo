import { ScrollView } from 'react-native'

import { Link } from 'expo-router'
import { ArrowRight } from 'lucide-react-native'
import { Text, useWindowDimensions, XStack, YStack } from 'tamagui'

import Loader from '@components/Loader'
import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'

import OfferCard from './OfferCard'

const CARD_GAP = 12
const H_PADDING = 16
const CARD_HEIGHT = 460

interface Props {
  offers: Listing[]
  isLoading: boolean
}

const LatestOffers: React.FC<Props> = ({ offers, isLoading }) => {
  const colors = useColors()
  const { width } = useWindowDimensions()
  const cardWidth = width

  return (
    <YStack gap="$3">
      <XStack justify="space-between" items="center" px="$4">
        <Text color={colors.textPrimary} fontSize={16} fontWeight="600">
          Latest Offers
        </Text>
        <Link href="/listings" asChild>
          <XStack items="center" gap="$1" pressStyle={{ opacity: 0.5 }}>
            <Text color={colors.accent} fontSize={16} fontWeight="400">
              All
            </Text>
            <ArrowRight width={16} height={16} color={colors.accent} />
          </XStack>
        </Link>
      </XStack>

      {isLoading ? (
        <YStack
          height={CARD_HEIGHT}
          style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          <Loader size={40} colorPrimary={colors.brand} colorSecondary={colors.amber} />
        </YStack>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + CARD_GAP}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: H_PADDING, gap: CARD_GAP }}
        >
          {offers.map((item) => (
            <OfferCard key={item.id} item={item} cardWidth={cardWidth} />
          ))}
        </ScrollView>
      )}
    </YStack>
  )
}

export default LatestOffers
