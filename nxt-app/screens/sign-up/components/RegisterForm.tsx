import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Text, YStack } from 'tamagui'
import { z } from 'zod'

import BrandButton from '@components/BrandButton'
import FormInput from '@components/FormInput'
import PasswordInput from '@components/PasswordInput'
import useColors from '@constants/useColors'
import authService from '@services/authService'

const registerSchema = z
  .object({
    name: z.string().min(1, 'Full name is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const RegisterForm = () => {
  const colors = useColors()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null)
    try {
      await authService.registerEmail(data.email, data.password, data.name)
    } catch {
      setSubmitError('Could not create account. Please try again.')
    }
  })

  return (
    <YStack gap="$3">
      <YStack gap="$2">
        <Text fontSize={14} lineHeight={20} color={colors.mist}>
          Full Name*
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              placeholder="John Doe"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.name && (
          <Text fontSize={12} color={colors.notificationDot}>
            {errors.name.message}
          </Text>
        )}
      </YStack>
      <YStack gap="$2">
        <Text fontSize={14} lineHeight={20} color={colors.mist}>
          Email Address*
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              placeholder="name@example.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <Text fontSize={12} color={colors.notificationDot}>
            {errors.email.message}
          </Text>
        )}
      </YStack>
      <YStack gap="$2">
        <Text fontSize={14} lineHeight={20} color={colors.mist}>
          Password*
        </Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <PasswordInput
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.password && (
          <Text fontSize={12} color={colors.notificationDot}>
            {errors.password.message}
          </Text>
        )}
      </YStack>
      <YStack gap="$2">
        <Text fontSize={14} lineHeight={20} color={colors.mist}>
          Confirm Password*
        </Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange, onBlur } }) => (
            <PasswordInput
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text fontSize={12} color={colors.notificationDot}>
            {errors.confirmPassword.message}
          </Text>
        )}
      </YStack>
      {submitError && (
        <Text fontSize={12} color={colors.notificationDot}>
          {submitError}
        </Text>
      )}
      <BrandButton onPress={onSubmit} disabled={isSubmitting} opacity={isSubmitting ? 0.6 : 1}>
        <Text color={colors.white} fontSize={16}>
          {isSubmitting ? 'Creating account…' : 'Create Account'}
        </Text>
      </BrandButton>
    </YStack>
  )
}

export default RegisterForm
