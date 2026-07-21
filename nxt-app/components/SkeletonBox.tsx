import { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'

interface Props {
  width: number | `${number}%`
  height: number
  radius?: number
  color: string
}

const SkeletonBox: React.FC<Props> = ({ width, height, radius = 4, color }) => {
  const [opacity] = useState(() => new Animated.Value(0.4))

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [opacity])

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: color,
        opacity,
      }}
    />
  )
}

export default SkeletonBox
