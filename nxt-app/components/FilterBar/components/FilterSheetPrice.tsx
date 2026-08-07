import { Text, XStack, YStack } from 'tamagui'

import FormInput from '@components/FormInput'
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
          <FormInput
            placeholder="0"
            keyboardType="numeric"
            fontSize={14}
            height={48}
            cursorColor={colors.textPrimary}
          />
        </YStack>
        <YStack flex={1} gap="$2">
          <Text fontSize={12} lineHeight={16} color={colors.textSecondary}>
            To
          </Text>
          <FormInput
            placeholder="No limit"
            keyboardType="numeric"
            fontSize={14}
            height={48}
            cursorColor={colors.textPrimary}
          />
        </YStack>
      </XStack>
    </YStack>
  )
}

export default FilterSheetPrice
