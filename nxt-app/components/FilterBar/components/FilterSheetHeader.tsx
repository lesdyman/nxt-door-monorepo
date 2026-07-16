import { TouchableOpacity } from 'react-native'

import { X } from 'lucide-react-native'
import { Text, XStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  onClose: () => void
}

const FilterSheetHeader: React.FC<Props> = ({ onClose }) => {
  const colors = useColors()
  return (
    <XStack
      px="$4"
      py="$3"
      borderBottomWidth={1}
      borderColor={colors.border}
      justify="space-between"
      items="center"
    >
      <TouchableOpacity style={{ padding: 4 }} onPress={onClose}>
        <X height={22} width={22} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text color={colors.pearl} fontSize="$5" fontWeight="600" lineHeight={28}>
        Filters
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <Text lineHeight={28} p="$1" fontWeight="500" fontSize={14} color={colors.accent}>
          Reset
        </Text>
      </TouchableOpacity>
    </XStack>
  )
}

export default FilterSheetHeader
