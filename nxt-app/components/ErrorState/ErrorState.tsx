import { AlertOctagon } from 'lucide-react-native'
import { Text, YStack } from 'tamagui'

import GlowIcon from '@components/GlowIcon/GlowIcon'
import useColors from '@constants/useColors'

const ErrorState: React.FC = () => {
  const colors = useColors()
  return (
    <YStack flex={1} items="center" mt="$10" px="$4">
      <GlowIcon showBorder={false} icon={AlertOctagon} size={180} color={colors.notificationDot} />
      <Text fontSize={24} lineHeight={32} text="center" color={colors.textPrimary}>
        Oops, something went wrong
      </Text>
      <Text text="center" fontSize={16} lineHeight={24} color={colors.textSecondary}>
        Looks like posts could not be loaded. Please, try again a little bit later.
      </Text>
    </YStack>
  )
}

export default ErrorState
