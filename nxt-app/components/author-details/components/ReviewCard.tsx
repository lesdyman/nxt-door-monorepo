import { TouchableOpacity } from 'react-native'

import { Star } from 'lucide-react-native'
import { Image, Separator, Text, XStack, YStack } from 'tamagui'

import { Review } from '@constants/types/Review'
import useColors from '@constants/useColors'

import dateFormatter from '../../../utils/dateFormateter'
import nameReducer from '../../../utils/nameReducer'

interface Props {
  review: Review
  reviewer: { name: string; avatar: string }
  listingTitle: string
  onPressListing?: () => void
}

const ReviewCard: React.FC<Props> = ({ review, reviewer, listingTitle, onPressListing }) => {
  const colors = useColors()
  return (
    <YStack
      gap="$3"
      p="$4"
      rounded={12}
      borderWidth={1}
      borderColor={colors.border}
      style={{ backgroundColor: colors.surfaceElevated }}
    >
      <XStack justify="space-between" items="center">
        <XStack gap="$2" items="center">
          <Image height={32} width={32} borderRadius={16} src={reviewer.avatar} />
          <Text color={colors.textPrimary} fontSize={15} fontWeight="600">
            {nameReducer(reviewer.name)}
          </Text>
        </XStack>
        <Text color={colors.textMuted} fontSize={13}>
          {dateFormatter(review.createdAt)}
        </Text>
      </XStack>

      <XStack gap="$1">
        {[1, 2, 3, 4, 5].map((position) => (
          <Star
            key={position}
            size={16}
            color={colors.amber}
            fill={position <= review.rating ? colors.amber : 'transparent'}
          />
        ))}
      </XStack>

      <Text color={colors.mist} fontSize={15} lineHeight={22}>
        {review.comment}
      </Text>

      <Separator borderColor={colors.border} />

      <TouchableOpacity onPress={onPressListing} disabled={!onPressListing}>
        <XStack gap="$1">
          <Text color={colors.textMuted} fontSize={13}>
            Reviewed:
          </Text>
          <Text color={colors.accent} fontSize={13} numberOfLines={1}>
            {listingTitle}
          </Text>
        </XStack>
      </TouchableOpacity>
    </YStack>
  )
}

export default ReviewCard
