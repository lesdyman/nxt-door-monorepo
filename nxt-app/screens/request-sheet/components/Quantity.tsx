import { Minus, Plus } from 'lucide-react-native'
import { Button, Text, XStack } from 'tamagui'

import useColors from '@constants/useColors'

const Quantity = () => {
  const colors = useColors()
  return (
    <XStack
      justify="space-between"
      bg={colors.ink}
      borderWidth={1}
      borderColor={colors.border}
      p="$3"
      rounded="$3"
      items="center"
      gap="$4"
    >
      <Text color={colors.textPrimary} fontSize={16} lineHeight={24}>
        Quantity
      </Text>
      <XStack gap="$4" items="center">
        <Button
          height={32}
          width={32}
          circular
          bg="transparent"
          borderWidth={1}
          borderColor={colors.border}
        >
          <Minus color={colors.textPrimary} />
        </Button>
        <Text color={colors.textPrimary} fontSize={16} lineHeight={24}>
          1
        </Text>
        <Button
          height={32}
          width={32}
          circular
          bg="transparent"
          borderWidth={1}
          borderColor={colors.border}
        >
          <Plus color={colors.textPrimary} />
        </Button>
      </XStack>
    </XStack>
  )
}

export default Quantity
