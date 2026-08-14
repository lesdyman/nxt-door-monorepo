import { useColorScheme } from 'react-native'

import { Button, ColorTokens, Image, Text, XStack } from 'tamagui'

const GOOGLE_DARK = {
  fill: '#131314' as ColorTokens,
  stroke: '#8E918F' as ColorTokens,
  text: '#E3E3E3' as ColorTokens,
}

const GOOGLE_LIGHT = {
  fill: '#FFFFFF' as ColorTokens,
  stroke: '#747775' as ColorTokens,
  text: '#1F1F1F' as ColorTokens,
}

interface Props {
  // Google's branding guidelines only allow "Sign in with Google",
  // "Sign up with Google", or "Continue with Google" as button text.
  label?: 'Sign in with Google' | 'Sign up with Google' | 'Continue with Google'
  onPress?: () => void
  disabled?: boolean
}

const GoogleLoginButton: React.FC<Props> = ({
  label = 'Sign in with Google',
  onPress,
  disabled,
}) => {
  const colorScheme = useColorScheme()
  const palette = colorScheme === 'light' ? GOOGLE_LIGHT : GOOGLE_DARK

  return (
    <Button
      height={48}
      rounded={22}
      bg={palette.fill}
      borderWidth={1}
      borderColor={palette.stroke}
      px={16}
      opacity={disabled ? 0.6 : 1}
      pressStyle={{ opacity: 0.85 }}
      onPress={onPress}
      disabled={disabled}
    >
      <XStack items="center" justify="center" gap={12} flex={1}>
        <Image src={require('../assets/g-logo.png')} width={20} height={20} />
        <Text
          fontSize={14}
          lineHeight={20}
          color={palette.text}
          style={{ fontFamily: 'GoogleSans_500Medium' }}
        >
          {label}
        </Text>
      </XStack>
    </Button>
  )
}

export default GoogleLoginButton
