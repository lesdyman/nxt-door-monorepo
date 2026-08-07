import { View } from 'react-native'

import { Text, YStack } from 'tamagui'

import FormInput from '@components/FormInput'
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
        <FormInput
          value={priceValue}
          onChangeText={onPriceChange}
          placeholder="min 0..."
          fontSize={14}
          lineHeight={20}
          multiline={false}
        />
      </YStack>
      <YStack flex={1} gap="$2">
        <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
          Quantity
        </Text>
        <FormInput placeholder="min 1..." fontSize={14} lineHeight={20} multiline={false} />
      </YStack>
    </View>
  )
}

export default PriceQuantity
