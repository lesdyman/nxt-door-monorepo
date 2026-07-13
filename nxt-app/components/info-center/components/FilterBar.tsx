import { Button, Text, XStack } from 'tamagui'

import { useBrandInteractionStyle } from '@components/shared/BrandButton'
import useColors from '@constants/useColors'

const messageTypes = ['all', 'info', 'marketplace']

interface Props {
  selectedType: string
  setSelectedType: (type: string) => void
}

const FilterBar: React.FC<Props> = ({ selectedType, setSelectedType }) => {
  const colors = useColors()
  const brandInteractionStyle = useBrandInteractionStyle()
  return (
    <XStack
      px="$4"
      py="$4"
      justify="space-between"
      borderBottomWidth={1}
      borderBottomColor={colors.border}
    >
      {messageTypes.map((type) => (
        <Button
          height={40}
          bg={type === selectedType ? colors.brand : 'transparent'}
          pressStyle={
            type === selectedType
              ? brandInteractionStyle
              : { bg: colors.buttonPressedBg, borderColor: colors.borderStrong }
          }
          focusStyle={
            type === selectedType
              ? brandInteractionStyle
              : { bg: colors.buttonPressedBg, borderColor: colors.borderStrong }
          }
          key={type}
          onPress={() => setSelectedType(type)}
        >
          <Text
            fontSize={16}
            lineHeight={24}
            fontWeight={type === selectedType ? '600' : '400'}
            color={selectedType === type ? colors.white : colors.mist}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </Button>
      ))}
    </XStack>
  )
}

export default FilterBar
