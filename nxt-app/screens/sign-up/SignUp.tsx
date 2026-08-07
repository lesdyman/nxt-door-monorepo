import { TouchableOpacity } from 'react-native'

import * as AppleAuthentication from 'expo-apple-authentication'
import { Link, useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg'
import { ScrollView, Text, View, XStack, YStack } from 'tamagui'

import AppleLoginButton from '@components/AppleLoginButton'
import GoogleLoginButton from '@components/GoogleLoginButton'
import Header from '@components/Header'
import useColors from '@constants/useColors'

import Devider from './components/Devider'
import Logo from './components/Logo'
import RegisterForm from './components/RegisterForm'

const SignUp = () => {
  const colors = useColors()
  const router = useRouter()

  return (
    <View position="relative" bg={colors.background} flex={1}>
      <Svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
        height={380}
        pointerEvents="none"
      >
        <Defs>
          <RadialGradient id="glow" cx="10%" cy="52%" r="70%">
            <Stop offset="0%" stopColor={colors.brand} stopOpacity={0.3} />
            <Stop offset="100%" stopColor={colors.background} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#glow)" />
      </Svg>

      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
        <Header>
          <XStack items="center" gap="$3">
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={22} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text color={colors.accent} fontSize={17} fontWeight="700">
              Join ND
            </Text>
          </XStack>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false} flex={1} mx="$4">
          <Logo />
          <RegisterForm />
          <XStack items="center" gap="$3" mt="$5">
            <Devider />
            <Text fontSize={14} lineHeight={20} color={colors.textMuted}>
              or
            </Text>
            <Devider />
          </XStack>
          <YStack gap="$4" mt="$5">
            <GoogleLoginButton label="Sign up with Google" />
            <AppleLoginButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
            />
            <YStack gap="$2" items="center" justify="center">
              <Text fontSize={12} lineHeight={16} color={colors.textMuted} text="center">
                By creating an account, you agree to our
              </Text>
              <Link href="/terms">
                <Text fontSize={12} lineHeight={16} color={colors.accent}>
                  Terms of Service
                </Text>
              </Link>
            </YStack>
            <Devider />
            <XStack items="center" justify="center" gap="$3">
              <Text fontSize={14} lineHeight={20} color={colors.mist}>
                Already have an account?
              </Text>
              <Link href="/auth">
                <Text fontSize={14} lineHeight={20} color={colors.brand}>
                  Sign In
                </Text>
              </Link>
            </XStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default SignUp
