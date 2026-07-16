import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TamaguiProvider, Theme } from 'tamagui'

import { darkColors, lightColors } from '../constants/colors'
import { tamaguiConfig } from '../tamagui.config'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  const backgroundColor = colorScheme === 'light' ? lightColors.background : darkColors.background

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
          <Theme name={colorScheme === 'light' ? 'light' : 'dark'}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor } }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="listing/[id]" />
              <Stack.Screen name="edit-listing/[id]" />
              <Stack.Screen name="info-center" />
              <Stack.Screen name="my-listings" />
              <Stack.Screen name="order-history" />
              <Stack.Screen name="saved" />
              <Stack.Screen name="help" />
              <Stack.Screen
                name="new-post"
                options={{ presentation: 'modal', headerShown: false }}
              />
            </Stack>
          </Theme>
        </TamaguiProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
