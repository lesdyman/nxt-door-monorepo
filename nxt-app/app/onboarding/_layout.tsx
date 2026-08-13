import { Stack } from 'expo-router'

import { OnboardingProvider } from '@contexts/OnboardingContext'

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="place" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="success" />
      </Stack>
    </OnboardingProvider>
  )
}
