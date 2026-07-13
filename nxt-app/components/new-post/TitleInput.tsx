import { ColorTokens, Input, Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const TitleInput = () => {
  const colors = useColors()
  return (
    <YStack gap="$2">
      <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
        Title
      </Text>
      <Input
        bg={colors.surface}
        color={colors.textPrimary}
        borderColor={colors.border}
        focusStyle={{ borderColor: colors.borderFocus }}
        placeholder="What are you offering or looking for?"
        fontSize={14}
        lineHeight={20}
        multiline={false}
        placeholderTextColor={colors.textSecondary as ColorTokens}
      />
    </YStack>
  )
}

export default TitleInput
