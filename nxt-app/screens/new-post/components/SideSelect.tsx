import { TouchableOpacity } from 'react-native'

import { Text, XStack, YStack } from 'tamagui'

import { Side } from '@constants/types/Side'
import useColors from '@constants/useColors'

interface Props {
  side: Side
  setSide: (side: Side) => void
}

const OPTIONS: { value: Side; label: string }[] = [
  { value: 'offer', label: 'Offer' },
  { value: 'order', label: 'Request' },
]

const SideSelect: React.FC<Props> = ({ side, setSide }) => {
  const colors = useColors()
  return (
    <YStack gap="$2">
      <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
        Post Type
      </Text>
      <XStack gap="$2">
        {OPTIONS.map((opt) => {
          const isActive = side === opt.value
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => setSide(opt.value)}
              activeOpacity={0.85}
              style={{
                flex: 1,
                backgroundColor: isActive ? colors.brand : colors.chipInactiveBg,
                borderColor: isActive ? colors.brand : colors.borderStrong,
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                color={isActive ? colors.white : colors.textPrimary}
                fontSize={14}
                fontWeight="500"
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </XStack>
    </YStack>
  )
}

export default SideSelect
