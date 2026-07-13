import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { Animated, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native'

interface TabBarContextValue {
  translateY: Animated.Value
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  hide: () => void
  show: () => void
}

const TabBarContext = createContext<TabBarContextValue | null>(null)

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [translateY] = useState(() => new Animated.Value(0))
  const lastY = useRef(0)
  const isHidden = useRef(false)

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentY = e.nativeEvent.contentOffset.y
      const diff = currentY - lastY.current

      if (diff > 8 && !isHidden.current && currentY > 20) {
        isHidden.current = true
        Animated.spring(translateY, {
          toValue: 120,
          useNativeDriver: true,
          tension: 80,
          friction: 12,
        }).start()
      } else if (diff < -8 && isHidden.current) {
        isHidden.current = false
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 12,
        }).start()
      }

      lastY.current = Math.max(0, currentY)
    },
    [translateY]
  )

  const hide = useCallback(() => {
    isHidden.current = true
    Animated.spring(translateY, {
      toValue: 120,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start()
  }, [translateY])

  const show = useCallback(() => {
    isHidden.current = false
    lastY.current = 0
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start()
  }, [translateY])

  return (
    <TabBarContext.Provider value={{ translateY, onScroll, hide, show }}>
      {children}
    </TabBarContext.Provider>
  )
}

export const useTabBar = (): TabBarContextValue => {
  const ctx = useContext(TabBarContext)
  if (!ctx) throw new Error('useTabBar must be used within TabBarProvider')
  return ctx
}

export const useTabBarSafe = (): TabBarContextValue | null => {
  return useContext(TabBarContext)
}
