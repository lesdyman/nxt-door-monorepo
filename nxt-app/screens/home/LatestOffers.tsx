import { ScrollView } from 'react-native'

import { Link } from 'expo-router'
import { ArrowRight } from 'lucide-react-native'
import { Text, useWindowDimensions, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'
import usePosts from '@hooks/usePosts'

import OfferCard from './OfferCard'

const CARD_GAP = 12
const H_PADDING = 16

const LatestOffers = () => {
  const colors = useColors()
  const { width } = useWindowDimensions()
  const cardWidth = width

  const offers = usePosts('offer', 5)

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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + CARD_GAP}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: H_PADDING, gap: CARD_GAP }}
      >
        {offers.data?.map((item) => (
          <OfferCard key={item.id} item={item} cardWidth={cardWidth} />
        ))}
      </ScrollView>
    </YStack>
  )
}

export default LatestOffers
