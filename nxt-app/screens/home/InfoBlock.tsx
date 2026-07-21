import { Info, Phone, ShieldAlert, Wrench } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import Loader from '@components/Loader'
import Place from '@constants/Place'
import useColors from '@constants/useColors'

interface Props {
  place?: Place
  isLoading?: boolean
}

const InfoBlock: React.FC<Props> = ({ place, isLoading }) => {
  const colors = useColors()
  return (
    <YStack
      gap="$3"
      position="relative"
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
      {isLoading && (
        <YStack
          position="absolute"
          t={0}
          l={0}
          r={0}
          b={0}
          rounded="$4"
          items="center"
          justify="center"
          z={1}
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <Loader colorPrimary={colors.white} colorSecondary={colors.amber} />
        </YStack>
      )}

      <YStack gap="$1">
        <XStack items="baseline" justify="space-between" gap="$2">
          <Text fontSize={16} lineHeight={24} fontWeight="400" color={colors.textPrimary}>
            Complex Info
          </Text>
          <Info width={20} height={20} color={colors.textSecondary} />
        </XStack>
        <Text fontSize={12} lineHeight={16} fontWeight="400" color={colors.textSecondary}>
          {place?.address || 'N/A'}
        </Text>
      </YStack>

      <YStack gap="$2">
        <XStack items="center" gap="$2">
          <Phone width={15} height={13} color={colors.iconSubtle} />
          <Text fontSize={14} lineHeight={20} color={colors.textMuted}>
            Management Company: {place?.mgmtPhone || 'N/A'}
          </Text>
        </XStack>
        <XStack items="center" gap="$2">
          <ShieldAlert width={15} height={13} color={colors.iconSubtle} />
          <Text fontSize={14} lineHeight={20} color={colors.textMuted}>
            Security: {place?.securityPhone || 'N/A'}
          </Text>
        </XStack>
        <XStack items="center" gap="$2">
          <Wrench width={15} height={13} color={colors.iconSubtle} />
          <Text fontSize={14} lineHeight={20} color={colors.textMuted}>
            Elevator Emergency: {place?.elevatorEmergency || 'N/A'}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  )
}

export default InfoBlock
