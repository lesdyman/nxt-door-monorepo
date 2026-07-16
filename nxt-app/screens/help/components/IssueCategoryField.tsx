import { TouchableOpacity } from 'react-native'

import { ChevronDown } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  category: string
  onPress: () => void
}

const IssueCategoryField: React.FC<Props> = ({ category, onPress }) => {
  const colors = useColors()
  return (
    <YStack gap="$2">
      <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
        Category
      </Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <XStack
          items="center"
          justify="space-between"
          height={48}
          px="$3"
          rounded={8}
          borderWidth={1}
          borderColor={colors.border}
          style={{ backgroundColor: colors.surface }}
        >
          <Text color={colors.textPrimary} fontSize={14}>
            {category}
          </Text>
          <ChevronDown size={16} color={colors.textSecondary} />
        </XStack>
      </TouchableOpacity>
    </YStack>
  )
}

export default IssueCategoryField
