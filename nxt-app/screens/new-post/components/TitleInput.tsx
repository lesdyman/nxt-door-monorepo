import { Text, YStack } from 'tamagui'

import FormInput from '@components/FormInput'
import useColors from '@constants/useColors'

interface Props {
  value: string
  onChangeText: (text: string) => void
}

const TitleInput: React.FC<Props> = ({ value, onChangeText }) => {
  const colors = useColors()
  return (
    <YStack gap="$2">
      <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
        Title
      </Text>
      <FormInput
        value={value}
        onChangeText={onChangeText}
        placeholder="What are you offering or looking for?"
        fontSize={14}
        lineHeight={20}
        multiline={false}
      />
    </YStack>
  )
}

export default TitleInput
