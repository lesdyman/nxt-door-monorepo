import { ScrollView, View } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { Text, XStack, YStack } from 'tamagui'

import { Side } from '@constants/types/Side'
import useColors from '@constants/useColors'

import dateFormatter from '../../../utils/dateFormateter'

interface Props {
  titleData: {
    title: string
    price: number
    side: Side
    updatedAt: Date
  }
}

const TitleBlock: React.FC<Props> = ({ titleData }) => {
  const colors = useColors()
  return (
    <YStack gap="$2">
      <XStack items="baseline" gap="$3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          bounces={false}
        >
          <Text fontSize={22} fontWeight="600" letterSpacing={-0.24} color={colors.textPrimary}>
            {titleData.title}
          </Text>
        </ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <LinearGradient
            colors={[`${colors.background}00`, colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ position: 'absolute', left: -24, top: 0, bottom: 0, width: 24 }}
            pointerEvents="none"
          />
          <Text fontSize={18} fontWeight="600" color={colors.brand} numberOfLines={1}>
            ₴{titleData.price}
          </Text>
        </View>
      </XStack>

      <XStack items="center" gap="$3">
        <Text
          bg={colors.offeringBadgeBg}
          color={colors.offeringBadgeText}
          fontWeight="500"
          px="$2"
          py="$1"
          fontSize={12}
          lineHeight={16}
          letterSpacing={0.12}
          rounded={4}
        >
          {titleData.side === 'offer' ? 'Offering' : 'Request'}
        </Text>
        <Text fontSize={12} lineHeight={16} letterSpacing={0.12} color={colors.textSecondary}>
          {dateFormatter(titleData.updatedAt)}
        </Text>
      </XStack>
    </YStack>
  )
}

export default TitleBlock
