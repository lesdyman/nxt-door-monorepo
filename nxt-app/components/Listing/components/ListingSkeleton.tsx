import { Skeleton } from 'moti/skeleton'
import { useThemeName, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const ListingSkeleton = () => {
  const colors = useColors()
  const themeName = useThemeName()
  const colorMode = themeName === 'dark' ? 'dark' : 'light'

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
        <Skeleton colorMode={colorMode} radius={8} height={64} width={64} />
        <Skeleton colorMode={colorMode} radius={8} height={22} width={72} />
      </XStack>

      <YStack pt="$1" gap="$2">
        <Skeleton colorMode={colorMode} radius={4} height={17} width="70%" />
        <Skeleton colorMode={colorMode} radius={4} height={40} width="100%" />
      </YStack>

      <XStack justify="space-between" items="center">
        <Skeleton colorMode={colorMode} radius={4} height={24} width={80} />
        <Skeleton colorMode={colorMode} radius={4} height={20} width={64} />
      </XStack>
    </YStack>
  )
}

export default ListingSkeleton
