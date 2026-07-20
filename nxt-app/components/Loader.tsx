import { useEffect, useState } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

type LoaderProps = {
  size?: number
  colorPrimary?: string
  colorSecondary?: string
}

const DOT_SIZE_RATIO = 0.16
const ORBIT_RADIUS_RATIO = 0.34
const TILT_RATIO = 0.4

const buildOrbit = (steps: number, radius: number, tilt: number) => {
  const input: number[] = []
  const x: number[] = []
  const y: number[] = []

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const angle = t * Math.PI * 2
    input.push(t)
    x.push(radius * Math.cos(angle))
    y.push(radius * Math.sin(angle) * tilt)
  }

  return { input, x, y }
}

const useOrbitAnim = (durationMs: number, delayMs: number) => {
  const [progress] = useState(() => new Animated.Value(0))

  useEffect(() => {
    progress.setValue(0)
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: durationMs,
        delay: delayMs,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )
    loop.start()
    return () => loop.stop()
  }, [progress, durationMs, delayMs])

  return progress
}

export default function Loader({
  size = 32,
  colorPrimary = '#fff',
  colorSecondary = '#ff3d00',
}: LoaderProps) {
  const radius = size * ORBIT_RADIUS_RATIO
  const dotSize = size * DOT_SIZE_RATIO
  const orbit = buildOrbit(24, radius, TILT_RATIO)

  const progress1 = useOrbitAnim(1000, 0)
  const progress2 = useOrbitAnim(1000, 400)

  const dotStyle = (progress: Animated.Value) => ({
    transform: [
      { translateX: progress.interpolate({ inputRange: orbit.input, outputRange: orbit.x }) },
      { translateY: progress.interpolate({ inputRange: orbit.input, outputRange: orbit.y }) },
    ],
  })

  return (
    <View
      style={[styles.container, { width: size, height: size, transform: [{ rotateZ: '45deg' }] }]}
    >
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: colorPrimary,
          },
          dotStyle(progress1),
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: colorSecondary,
          },
          dotStyle(progress2),
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
  },
})
