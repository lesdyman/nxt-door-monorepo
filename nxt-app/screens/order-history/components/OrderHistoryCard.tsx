import { ShoppingBag } from 'lucide-react-native'
import { Button, Separator, Text, View, XStack, YStack } from 'tamagui'

import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'
import useUser from '@hooks/useUser'
import dateFormatter from '@utils/dateFormateter'
import nameReducer from '@utils/nameReducer'

interface Props {
  listing: Listing
  onPressDetails?: () => void
}

const OrderHistoryCard: React.FC<Props> = ({ listing, onPressDetails }) => {
  const colors = useColors()
  const { data: author } = useUser(listing.userId)

  return (
    <YStack
      gap="$3"
      p="$4"
      rounded={12}
      borderWidth={1}
      borderColor={colors.border}
      style={{ backgroundColor: colors.surfaceElevated }}
    >
      <XStack justify="space-between" items="center" gap="$2">
        <XStack gap="$3" items="center" flex={1}>
          <View
            height={44}
            width={44}
            rounded={10}
            items="center"
            justify="center"
            bg={colors.neighborIconBg}
          >
            <ShoppingBag size={20} color={colors.iconSubtle} />
          </View>
          <YStack flex={1} gap={2}>
            <Text color={colors.textPrimary} fontSize={15} fontWeight="600" numberOfLines={1}>
              {listing.title}
            </Text>
            <Text color={colors.textSecondary} fontSize={13} numberOfLines={1}>
              {author ? nameReducer(author.name) : 'Unknown user'}
            </Text>
          </YStack>
        </XStack>
        <XStack bg={colors.requestBadgeBg} px="$2" py={2} rounded={6} style={{ maxHeight: 24 }}>
          <Text color={colors.requestBadgeText} fontSize={12} fontWeight="600">
            Completed
          </Text>
        </XStack>
      </XStack>

      <Separator borderColor={colors.border} />

      <XStack justify="space-between" items="flex-end">
        <YStack gap={2}>
          <Text color={colors.textMuted} fontSize={13}>
            {dateFormatter(listing.updatedAt)}
          </Text>
          <Text color={colors.textPrimary} fontSize={16} fontWeight="600">
            {listing.price === 0 ? 'Free' : `${listing.price} ${listing.currency}`}
          </Text>
        </YStack>
        <Button
          height={36}
          bg="transparent"
          borderWidth={1}
          borderColor={colors.borderStrong}
          pressStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderStrong }}
          focusStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderStrong }}
          onPress={onPressDetails}
        >
          <Text color={colors.textPrimary} fontSize={14} fontWeight="600">
            View Details
          </Text>
        </Button>
      </XStack>
    </YStack>
  )
}

export default OrderHistoryCard
