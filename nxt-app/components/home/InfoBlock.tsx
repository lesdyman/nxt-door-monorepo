import { Info, Phone, ShieldAlert, Wrench } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const InfoBlock = () => {
  const colors = useColors()
  return (
    <YStack
      gap="$3"
      style={{ backgroundColor: colors.surfaceElevated }}
      borderWidth={1}
      borderColor={colors.border}
      rounded="$4"
      py="$4"
      px="$4"
      mx="$4"
      mt="$4"
      pl="$3"
      borderLeftWidth={4}
      borderLeftColor={colors.brand}
    >
      <YStack gap="$1">
        <XStack items="baseline" justify="space-between" gap="$2">
          <Text fontSize={16} lineHeight={24} fontWeight="400" color={colors.textPrimary}>
            Complex Info
          </Text>
          <Info width={20} height={20} color={colors.textSecondary} />
        </XStack>
        <Text fontSize={12} lineHeight={16} fontWeight="400" color={colors.textSecondary}>
          Stetsenka, 75A
        </Text>
      </YStack>

      <YStack gap="$2">
        <XStack items="center" gap="$2">
          <Phone width={15} height={13} color={colors.iconSubtle} />
          <Text fontSize={14} lineHeight={20} color={colors.textMuted}>
            Management Company: +38 044 123 45 67
          </Text>
        </XStack>
        <XStack items="center" gap="$2">
          <ShieldAlert width={15} height={13} color={colors.iconSubtle} />
          <Text fontSize={14} lineHeight={20} color={colors.textMuted}>
            Security: +38 044 123 45 67
          </Text>
        </XStack>
        <XStack items="center" gap="$2">
          <Wrench width={15} height={13} color={colors.iconSubtle} />
          <Text fontSize={14} lineHeight={20} color={colors.textMuted}>
            Elevator Emergency: +38 044 123 45 67
          </Text>
        </XStack>
      </YStack>
    </YStack>
  )
}

export default InfoBlock
