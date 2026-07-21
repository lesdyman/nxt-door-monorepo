import { XStack, YStack } from 'tamagui'

import SkeletonBox from '@components/SkeletonBox'
import useColors from '@constants/useColors'

const ListingSkeleton = () => {
  const colors = useColors()
  const base = colors.surface

  return (
    <YStack
      px="$4"
      py="$4"
      gap="$2"
      rounded={12}
      borderWidth={1}
      borderColor={colors.border}
      style={{ backgroundColor: colors.surfaceElevated }}
    >
      <XStack justify="space-between">
        <SkeletonBox color={base} radius={8} height={64} width={64} />
        <SkeletonBox color={base} radius={8} height={22} width={72} />
      </XStack>

      <YStack pt="$1" gap="$2">
        <SkeletonBox color={base} radius={4} height={17} width="70%" />
        <SkeletonBox color={base} radius={4} height={40} width="100%" />
      </YStack>

      <XStack justify="space-between" items="center">
        <SkeletonBox color={base} radius={4} height={24} width={80} />
        <SkeletonBox color={base} radius={4} height={20} width={64} />
      </XStack>
    </YStack>
  )
}

export default ListingSkeleton
