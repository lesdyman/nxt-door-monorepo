import { ColorTokens, Image, Text, View } from 'tamagui'

import useColors from '@constants/useColors'
import getInitials from '@utils/getInitials'

interface Props {
  name: string
  avatarUrl?: string | null
  size: number
  borderWidth?: number
  borderColor?: string
}

const UserAvatar: React.FC<Props> = ({ name, avatarUrl, size, borderWidth = 0, borderColor }) => {
  const colors = useColors()
  const resolvedBorderColor = (borderColor ?? colors.border) as ColorTokens

  if (avatarUrl) {
    return (
      <Image
        height={size}
        width={size}
        borderRadius={size / 2}
        borderWidth={borderWidth}
        borderColor={resolvedBorderColor}
        src={avatarUrl}
      />
    )
  }

  return (
    <View
      height={size}
      width={size}
      rounded={size / 2}
      items="center"
      justify="center"
      bg={colors.surfaceElevated}
      borderWidth={borderWidth}
      borderColor={resolvedBorderColor}
    >
      <Text color={colors.brand} fontWeight="700" fontSize={size * 0.36}>
        {getInitials(name)}
      </Text>
    </View>
  )
}

export default UserAvatar
