import { Text, YStack } from 'tamagui'

import GlowIcon from '@components/GlowIcon/GlowIcon'
import { Side } from '@constants/types/Side'
import useColors from '@constants/useColors'

interface Props {
  postSide: Side
  icon: React.ComponentType<{ size?: number; color?: string }>
}

const NoPosts: React.FC<Props> = ({ postSide, icon: Icon }) => {
  const colors = useColors()
  return (
    <YStack flex={1} items="center" mt="$10" px="$4">
      <GlowIcon icon={Icon} size={180} />
      <Text fontSize={24} lineHeight={32} text="center" color={colors.textPrimary}>
        No {postSide === 'offer' ? 'offers' : 'orders'} yet
      </Text>
      <Text text="center" fontSize={16} lineHeight={24} color={colors.textSecondary}>
        No one&apos;s {postSide === 'offer' ? 'offering' : 'looking for'} anything in your complex
        yet — be the first!
      </Text>
    </YStack>
  )
}

export default NoPosts
