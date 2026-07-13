import { Input, Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const FilterSheetPrice = () => {
  const colors = useColors()
  return (
    <YStack gap="$3">
      <XStack justify="space-between" items="center">
        <Text
          fontSize={14}
          fontWeight="500"
          lineHeight={20}
          color={colors.mist}
          textTransform="uppercase"
        >
          Price
        </Text>
        <Text fontSize={12} lineHeight={16} color={colors.textSecondary}>
          ₴ (UAH)
        </Text>
      </XStack>

      <XStack gap="$3" justify="space-between">
        <YStack flex={1} gap="$2">
          <Text fontSize={12} lineHeight={16} color={colors.textSecondary}>
            From
          </Text>
          <Input
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="$gray9"
            fontSize={14}
            height={48}
            color={colors.textPrimary}
            borderColor={colors.border}
            focusStyle={{ borderColor: colors.borderFocus }}
            style={{ backgroundColor: colors.surface }}
            cursorColor={colors.textPrimary}
          />
        </YStack>
        <YStack flex={1} gap="$2">
          <Text fontSize={12} lineHeight={16} color={colors.textSecondary}>
            To
          </Text>
          <Input
            placeholder="No limit"
            keyboardType="numeric"
            placeholderTextColor="$gray9"
            fontSize={14}
            height={48}
            color={colors.textPrimary}
            borderColor={colors.border}
            focusStyle={{ borderColor: colors.borderFocus }}
            style={{ backgroundColor: colors.surface }}
            cursorColor={colors.textPrimary}
          />
        </YStack>
      </XStack>
    </YStack>
  )
}

export default FilterSheetPrice
