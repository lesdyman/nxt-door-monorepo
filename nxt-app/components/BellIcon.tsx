import { Bell } from 'lucide-react-native'
import { XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const BellIcon = () => {
  const colors = useColors()
  return (
    <XStack position="relative">
      <Bell width={16} height={20} color={colors.textPrimary} />
      <YStack
        position="absolute"
        t={-2}
        r={-4}
        width={8}
        height={8}
        rounded={999}
        style={{ backgroundColor: colors.notificationDot }}
      />
    </XStack>
  )
}

export default BellIcon
