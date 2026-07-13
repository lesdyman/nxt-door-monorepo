import { Star } from 'lucide-react-native'
import { Separator, Text, XStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  rateData: {
    rating: number
    reviewsCount: number
  }
}

const RateWidget: React.FC<Props> = ({ rateData }) => {
  const colors = useColors()
  const { rating, reviewsCount } = rateData
  return (
    <XStack
      gap="$2"
      items="center"
      justify="center"
      bg={colors.tabBarBg}
      py="$3"
      px="$4"
      rounded={12}
      borderWidth={1}
      borderColor={colors.border}
    >
      <XStack gap="$1" items="center">
        <Star size={16} color={colors.amber} fill={colors.amber} />
        <Text color={colors.textPrimary} fontSize={16} lineHeight={24}>
          {rating}
        </Text>
      </XStack>
      <Separator self="stretch" vertical mx={16} borderColor={colors.borderStrong} />
      <Text color={colors.mist} fontSize={16} lineHeight={24}>
        {reviewsCount} reviews
      </Text>
    </XStack>
  )
}

export default RateWidget
