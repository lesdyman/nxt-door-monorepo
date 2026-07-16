import { ColorTokens, Text, TextArea, YStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  value: string
  onChangeText: (text: string) => void
}

const Description: React.FC<Props> = ({ value, onChangeText }) => {
  const colors = useColors()
  return (
    <YStack gap="$2">
      <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
        Description
      </Text>
      <TextArea
        value={value}
        onChangeText={onChangeText}
        bg={colors.surface}
        color={colors.textPrimary}
        borderColor={colors.border}
        focusStyle={{ borderColor: colors.borderFocus }}
        placeholder="Describe the condition, features, or any other details..."
        placeholderTextColor={colors.textSecondary as ColorTokens}
        fontSize={14}
        lineHeight={20}
        height={106}
      />
    </YStack>
  )
}

export default Description
