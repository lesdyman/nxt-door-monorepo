import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TamaguiProvider, Theme } from 'tamagui'

import { AuthProvider, useAuth } from '@contexts/AuthContext'

import { darkColors, lightColors } from '../constants/colors'
import { tamaguiConfig } from '../tamagui.config'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

function AuthGate({ children }: { children: React.ReactNode }) {
  const { userId, isPending } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    // Session is still being read from SecureStore — deciding now would
    // redirect a logged-in user to /auth for a frame before it resolves.
    if (isPending) return

    const inAuthScreen = segments[0] === 'auth'
    if (!userId && !inAuthScreen) {
      router.replace('/auth')
    }
  }, [userId, isPending, segments, router])

  return children
}

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
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
            <Theme name={colorScheme === 'light' ? 'light' : 'dark'}>
              <AuthGate>
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor } }}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="auth" />
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
              </AuthGate>
            </Theme>
          </TamaguiProvider>
        </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
