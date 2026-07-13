import { Animated } from 'react-native'

import { useTabBar } from '@contexts/TabBarContext'
import { BottomTabBar, type BottomTabBarProps } from 'expo-router/tabs'

const AnimatedTabBar = (props: BottomTabBarProps) => {
  const { translateY } = useTabBar()

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ translateY }],
      }}
    >
      <BottomTabBar {...props} />
    </Animated.View>
  )
}

export default AnimatedTabBar
