import { TouchableOpacity } from 'react-native'

import { Text } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  filter: string
  isActive: boolean
  toggleFilter: (filter: string) => void
  fontSize?: number
}

const Filter: React.FC<Props> = ({ filter, isActive, toggleFilter, fontSize = 12 }) => {
  const colors = useColors()
  return (
    <TouchableOpacity
      key={filter}
      onPress={() => toggleFilter(filter)}
      style={{
        backgroundColor: isActive ? colors.brand : colors.chipInactiveBg,
        borderColor: isActive ? colors.brand : colors.borderStrong,
        borderWidth: 1,
        minWidth: 65,
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        color={colors.textPrimary}
        fontSize={fontSize}
        lineHeight={16}
        letterSpacing={0.12}
        fontWeight="500"
      >
        {filter}
      </Text>
    </TouchableOpacity>
  )
}

export default Filter
