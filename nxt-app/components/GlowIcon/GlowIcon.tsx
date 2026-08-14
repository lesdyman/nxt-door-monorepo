import { useId } from 'react'

import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg'
import { View } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  icon: React.ComponentType<{ size?: number; color?: string }>
  size?: number
}

const GlowIcon: React.FC<Props> = ({ icon: Icon, size = 180 }) => {
  const colors = useColors()
  const gradientId = useId()
  const iconSize = size / 3

  return (
    <View self="center" width={size} height={size} items="center" justify="center">
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute' }}
      >
        <Defs>
          <RadialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={colors.brand} stopOpacity={0.15} />
            <Stop offset="100%" stopColor={colors.brand} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={size} height={size} fill={`url(#${gradientId})`} />
      </Svg>

      <View
        justify="center"
        items="center"
        rounded={12}
        bg="rgba(164, 201, 255, 0.002)"
        p="$4"
        borderWidth={1}
        borderColor={colors.borderStrong}
      >
        <Icon size={iconSize} color={colors.linkAccent} />
      </View>
    </View>
  )
}

export default GlowIcon
