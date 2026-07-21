import { XStack, YStack } from 'tamagui'

import SkeletonBox from '@components/SkeletonBox'
import useColors from '@constants/useColors'

const SavedListingSkeleton = () => {
  const colors = useColors()
  const base = colors.surface

  return (
    <XStack items="center" gap="$3" py="$3" borderBottomWidth={1} borderBottomColor={colors.border}>
      <SkeletonBox color={base} radius={10} height={64} width={64} />

      <YStack flex={1} gap={6}>
        <SkeletonBox color={base} radius={4} height={15} width="70%" />
        <SkeletonBox color={base} radius={4} height={14} width="45%" />
      </YStack>

      <SkeletonBox color={base} radius={10} height={20} width={20} />
      <SkeletonBox color={base} radius={9} height={18} width={18} />
    </XStack>
  )
}

export default SavedListingSkeleton
