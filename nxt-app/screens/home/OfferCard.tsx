import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Card, Image, Text, YStack } from 'tamagui'

import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'

interface Props {
  cardWidth: number
  item: Listing
}

const OfferCard: React.FC<Props> = ({ item, cardWidth }) => {
  const colors = useColors()
  const router = useRouter()
  const queryClient = useQueryClient()

  const handlePress = () => {
    queryClient.setQueryData(['listingDetails', item.id], item)
    router.push(`/listing/${item.id}`)
  }

  return (
    <Card
      width={cardWidth}
      alignSelf="flex-start"
      borderWidth={1}
      borderColor={colors.border}
      borderRadius={12}
      overflow="hidden"
      onPress={handlePress}
      pressStyle={{ opacity: 0.85 }}
      style={{ backgroundColor: colors.surface }}
    >
      <YStack position="relative">
        <Image src={item.images[0]} style={{ width: cardWidth, height: 400 }} objectFit="cover" />
        <YStack
          position="absolute"
          t={12}
          l={12}
          px={4}
          py={2}
          rounded={4}
          style={{ backgroundColor: colors.offeringBadgeBg }}
        >
          <Text color={colors.offeringBadgeText} fontSize={11} fontWeight="700" letterSpacing={0}>
            OFFERING
          </Text>
        </YStack>
      </YStack>
      <YStack p="$3" gap="$2">
        <Text color={colors.textPrimary} fontSize={16} fontWeight="500">
          {item.title}
        </Text>
        <Text color={colors.accent} fontSize={16} fontWeight="600">
          ₴{item.price}
        </Text>
      </YStack>
    </Card>
  )
}

export default OfferCard
