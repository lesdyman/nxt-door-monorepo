import { Text, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import FormInput from '@components/FormInput'
import useColors from '@constants/useColors'

import PasswordInput from './PasswordInput'
const RegisterForm = () => {
  const colors = useColors()
  return (
    <YStack gap="$3">
      <YStack gap="$2">
        <Text fontSize={14} lineHeight={20} color={colors.mist}>
          Full Name
        </Text>
        <FormInput placeholder="John Doe" />
      </YStack>
      <YStack gap="$2">
        <Text fontSize={14} lineHeight={20} color={colors.mist}>
          Email Address
        </Text>
        <FormInput placeholder="name@example.com" />
      </YStack>
      <YStack gap="$2">
        <Text fontSize={14} lineHeight={20} color={colors.mist}>
          Password
        </Text>
        <PasswordInput placeholder="••••••••" />
      </YStack>
      <YStack gap="$2">
        <Text fontSize={14} lineHeight={20} color={colors.mist}>
          Confirm Password
        </Text>
        <PasswordInput placeholder="••••••••" />
      </YStack>
      <BrandButton>
        <Text color={colors.white} fontSize={16}>
          Create Account
        </Text>
      </BrandButton>
    </YStack>
  )
}

export default RegisterForm
