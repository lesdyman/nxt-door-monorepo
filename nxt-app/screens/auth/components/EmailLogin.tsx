import { ColorTokens, Input, Text, XStack, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import useColors from '@constants/useColors'

const EmailLogin = () => {
  const colors = useColors()
  return (
    <YStack gap="$4">
      <YStack gap="$2">
        <Text fontSize={16} lineHeight={24} color={colors.textMuted}>
          Email
        </Text>
        <Input
          bg={colors.surface}
          color={colors.textPrimary}
          borderColor={colors.border}
          focusStyle={{ borderColor: colors.borderFocus }}
          fontSize={16}
          lineHeight={20}
          placeholder="name@example.com"
          placeholderTextColor={colors.textSecondary as ColorTokens}
        />
      </YStack>
      <YStack gap="$2">
        <XStack justify="space-between" items="center">
          <Text fontSize={16} lineHeight={24} color={colors.textMuted}>
            Password
          </Text>
          <Text fontSize={16} lineHeight={24} color={colors.linkAccent}>
            Forgot password?
          </Text>
        </XStack>
        <Input
          bg={colors.surface}
          color={colors.textPrimary}
          borderColor={colors.border}
          focusStyle={{ borderColor: colors.borderFocus }}
          fontSize={16}
          lineHeight={20}
          placeholder="Enter your password"
          placeholderTextColor={colors.textSecondary as ColorTokens}
          secureTextEntry
        />
      </YStack>
      <BrandButton>
        <Text color={colors.white} fontSize={16} lineHeight={24}>
          Log In
        </Text>
      </BrandButton>
    </YStack>
  )
}

export default EmailLogin
