import { Text, View, YStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  data: {
    amountAvailable: string
    category: string
  }
}

const AmountCategory: React.FC<Props> = ({ data }) => {
  const colors = useColors()
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
      <YStack bg={colors.surface} px="$3" py="$3" gap="$1" rounded={8} flex={1}>
        <Text
          color={colors.stone}
          fontWeight="500"
          fontSize={12}
          lineHeight={16}
          letterSpacing={0.12}
        >
          Amount
        </Text>
        <Text color={colors.pearl} fontSize={14} lineHeight={20}>
          {data.amountAvailable}
        </Text>
      </YStack>

      <YStack bg={colors.surface} px="$3" py="$3" gap="$1" rounded={8} flex={1}>
        <Text
          color={colors.stone}
          fontWeight="500"
          fontSize={12}
          lineHeight={16}
          letterSpacing={0.12}
        >
          Category
        </Text>
        <Text color={colors.pearl} fontSize={14} lineHeight={20}>
          {data.category}
        </Text>
      </YStack>
    </View>
  )
}

export default AmountCategory
