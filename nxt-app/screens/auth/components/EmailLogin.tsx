import { useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { Text, XStack, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import FormInput from '@components/FormInput'
import PasswordInput from '@components/PasswordInput'
import useColors from '@constants/useColors'
import authService from '@services/authService'

const EmailLogin = () => {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const colors = useColors()

  const handleLogin = handleSubmit(async (data) => {
    setSubmitError(null)
    try {
      await authService.loginEmail(data.email, data.password)
    } catch {
      setSubmitError('Invalid email or password. Please try again.')
    }
  })
  return (
    <YStack gap="$4">
      <YStack gap="$2">
        <Text fontSize={16} lineHeight={24} color={colors.textMuted}>
          Email*
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              fontSize={16}
              lineHeight={20}
              placeholder="name@example.com"
            />
          )}
        />
      </YStack>
      <YStack gap="$2">
        <XStack justify="space-between" items="center">
          <Text fontSize={16} lineHeight={24} color={colors.textMuted}>
            Password*
          </Text>
          <Text fontSize={16} lineHeight={24} color={colors.linkAccent}>
            Forgot password?
          </Text>
        </XStack>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <PasswordInput
              fontSize={16}
              lineHeight={20}
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </YStack>
      {submitError && (
        <Text fontSize={12} color={colors.notificationDot}>
          {submitError}
        </Text>
      )}
      <BrandButton onPress={handleLogin} disabled={isSubmitting} opacity={isSubmitting ? 0.6 : 1}>
        <Text color={colors.white} fontSize={16} lineHeight={24}>
          {isSubmitting ? 'Logging in…' : 'Log In'}
        </Text>
      </BrandButton>
    </YStack>
  )
}

export default EmailLogin
