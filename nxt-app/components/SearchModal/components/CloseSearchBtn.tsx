import { TouchableOpacity } from 'react-native'

import { X } from 'lucide-react-native'
import { Text } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  onClose: () => void
}

const CloseSearchBtn: React.FC<Props> = ({ onClose }) => {
  const colors = useColors()
  return (
    <TouchableOpacity
      onPress={onClose}
      style={{
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.closeButtonBg,
        borderColor: colors.borderStrong,
        borderRadius: 999,
        paddingVertical: 12,
        paddingHorizontal: 20,
      }}
    >
      <X width={14} height={14} color={colors.textPrimary} />
      <Text color={colors.textPrimary} fontSize={14}>
        Close Search
      </Text>
    </TouchableOpacity>
  )
}

export default CloseSearchBtn
