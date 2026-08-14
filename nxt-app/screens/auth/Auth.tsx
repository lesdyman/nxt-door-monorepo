import { useState } from 'react'

import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg'
import { Text, View, XStack, YStack } from 'tamagui'

import AppleLoginButton from '@components/AppleLoginButton'
import GoogleLoginButton from '@components/GoogleLoginButton'
import useColors from '@constants/useColors'
import authService from '@services/authService'

import EmailLogin from './components/EmailLogin'
import LogoBlock from './components/LogoBlock'

export default function Auth() {
  const colors = useColors()
  const [googleError, setGoogleError] = useState<string | null>(null)
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false)

  const handleLoginWithGoogle = async () => {
    setGoogleError(null)
    setIsGoogleSubmitting(true)
    try {
      await authService.continueWithGoogle()
    } catch {
      setGoogleError('Could not sign in with Google. Please try again.')
    } finally {
      setIsGoogleSubmitting(false)
    }
  }

  return (
    <View position="relative" bg={colors.background} flex={1}>
      <Svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
        height={380}
        pointerEvents="none"
      >
        <Defs>
          <RadialGradient id="glow" cx="62%" cy="45%" r="65%">
            <Stop offset="0%" stopColor={colors.brand} stopOpacity={0.3} />
            <Stop offset="100%" stopColor={colors.background} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#glow)" />
      </Svg>

      <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, gap: 14 }}>
        <LogoBlock />
        <EmailLogin />
        <XStack items="center" gap="$3">
          <View flex={1} height={1} bg={colors.border} />
          <Text fontSize={14} lineHeight={20} color={colors.textMuted}>
            or
          </Text>
          <View flex={1} height={1} bg={colors.border} />
        </XStack>
        <YStack gap="$6">
          <YStack gap="$3">
            {googleError && (
              <Text fontSize={12} color={colors.notificationDot}>
                {googleError}
              </Text>
            )}
            <GoogleLoginButton onPress={handleLoginWithGoogle} disabled={isGoogleSubmitting} />
            <AppleLoginButton />
          </YStack>
          <XStack items="center" gap="$2" justify="center">
            <Text fontSize={16} lineHeight={24} color={colors.textMuted}>
              Don&apos;t have an account?
            </Text>
            <Link href="/sign-up" asChild>
              <Text fontSize={16} lineHeight={24} fontWeight="600" color={colors.linkAccent}>
                Sign Up
              </Text>
            </Link>
          </XStack>
        </YStack>
      </SafeAreaView>
    </View>
  )
}
