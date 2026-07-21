import { TouchableOpacity } from 'react-native'

import { Clock4 } from 'lucide-react-native'
import { Image, Text, XStack, YStack } from 'tamagui'

import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'
import CATEGORY_EMOJI from '@utils/categoryEmoji'
import dateFormatter from '@utils/dateFormateter'

import Reserved from './components/Reserved'
import SideBadge from './components/SideBadge'

interface Props {
  data: Listing
  onPress?: () => void
}

const ListingCard: React.FC<Props> = ({ data, onPress }) => {
  const colors = useColors()
  const hasImage = data.images.length > 0

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <YStack
        px="$4"
        py="$4"
        gap="$2"
        rounded={12}
        borderWidth={1}
        position="relative"
        borderColor={colors.border}
        style={{
          backgroundColor: colors.surfaceElevated,
          opacity: data.status === 'active' ? 1 : 0.4,
        }}
      >
        {data.status === 'reserved' && <Reserved />}
        <XStack justify="space-between">
          {hasImage ? (
            <Image
              borderRadius={8}
              borderWidth={1}
              borderColor={colors.borderStrong}
              height={64}
              width={64}
              src={data.images[0]}
            />
          ) : (
            <YStack
              height={64}
              width={64}
              rounded={8}
              borderWidth={1}
              borderColor={colors.borderStrong}
              items="center"
              justify="center"
              style={{ backgroundColor: colors.surface }}
            >
              <Text fontSize={28}>{CATEGORY_EMOJI[data.category] ?? '📦'}</Text>
            </YStack>
          )}
          <SideBadge side={data.side} />
        </XStack>

        <YStack pt="$1">
          <Text
            fontSize={14}
            fontWeight={600}
            lineHeight={21}
            color={colors.textPrimary}
            numberOfLines={1}
          >
            {data.title}
          </Text>
          <Text color={colors.textMuted} fontSize={16} lineHeight={24} numberOfLines={2}>
            {data.description}
          </Text>
        </YStack>
        <XStack justify="space-between" items="center">
          <Text fontSize={20} lineHeight={28} fontWeight={600} color={colors.brand}>
            {data.price === 0 ? 'Free' : `${data.price} ${data.currency}`}
          </Text>
          <XStack gap="$1" items="center">
            <Clock4 height={11} width={11} color={colors.stone} />
            <Text fontSize={16} lineHeight={24} color={colors.stone}>
              {dateFormatter(data.updatedAt)}
            </Text>
          </XStack>
        </XStack>
      </YStack>
    </TouchableOpacity>
  )
}

export default ListingCard
