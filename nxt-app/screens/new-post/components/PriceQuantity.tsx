import { View } from 'react-native'

import { ColorTokens, Input, Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  priceValue: string
  onPriceChange: (text: string) => void
}
const PriceQuantity: React.FC<Props> = ({ priceValue, onPriceChange }) => {
  const colors = useColors()
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <YStack flex={1} gap="$2">
        <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
          Price
        </Text>
        <Input
          value={priceValue}
          onChangeText={onPriceChange}
          bg={colors.surface}
          color={colors.textPrimary}
          borderColor={colors.border}
          focusStyle={{ borderColor: colors.borderFocus }}
          placeholder="min 0..."
          fontSize={14}
          lineHeight={20}
          multiline={false}
          placeholderTextColor={colors.textSecondary as ColorTokens}
        />
      </YStack>
      <YStack flex={1} gap="$2">
        <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
          Quantity
        </Text>
        <Input
          bg={colors.surface}
          color={colors.textPrimary}
          borderColor={colors.border}
          fontSize={14}
          lineHeight={20}
          multiline={false}
          focusStyle={{ borderColor: colors.borderFocus }}
          placeholder="min 1..."
          placeholderTextColor={colors.textSecondary as ColorTokens}
        />
      </YStack>
    </View>
  )
}

export default PriceQuantity
