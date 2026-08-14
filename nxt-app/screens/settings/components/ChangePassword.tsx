import { useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button, Text, YStack } from 'tamagui'
import { z } from 'zod'

import PasswordInput from '@components/PasswordInput'
import useColors from '@constants/useColors'
import { authClient } from '@services/authClient'

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  })

const ChangePassword = () => {
  const colors = useColors()
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isChangingPassword },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  })

  const onChangePassword = handlePasswordSubmit(async (data) => {
    setPasswordError(null)
    const { error } = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    })
    if (error) {
      setPasswordError(error.message ?? 'Could not change password. Please try again.')
      return
    }
    resetPassword()
    Alert.alert('Password Changed', 'Your password has been updated.')
  })

  return (
    <YStack
      gap="$4"
      p="$4"
      rounded="$4"
      borderWidth={1}
      borderColor={colors.border}
      bg={colors.surface}
    >
      <Text fontSize={16} fontWeight="600" color={colors.textPrimary}>
        Change Password
      </Text>

      <YStack gap="$2">
        <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textSecondary}>
          Current password
        </Text>
        <Controller
          control={passwordControl}
          name="currentPassword"
          render={({ field: { value, onChange, onBlur } }) => (
            <PasswordInput
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {passwordErrors.currentPassword && (
          <Text fontSize={12} color={colors.notificationDot}>
            {passwordErrors.currentPassword.message}
          </Text>
        )}
      </YStack>

      <YStack gap="$2">
        <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textSecondary}>
          New password
        </Text>
        <Controller
          control={passwordControl}
          name="newPassword"
          render={({ field: { value, onChange, onBlur } }) => (
            <PasswordInput
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {passwordErrors.newPassword && (
          <Text fontSize={12} color={colors.notificationDot}>
            {passwordErrors.newPassword.message}
          </Text>
        )}
      </YStack>

      <YStack gap="$2">
        <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textSecondary}>
          Confirm new password
        </Text>
        <Controller
          control={passwordControl}
          name="confirmNewPassword"
          render={({ field: { value, onChange, onBlur } }) => (
            <PasswordInput
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {passwordErrors.confirmNewPassword && (
          <Text fontSize={12} color={colors.notificationDot}>
            {passwordErrors.confirmNewPassword.message}
          </Text>
        )}
      </YStack>

      {passwordError && (
        <Text fontSize={12} color={colors.notificationDot}>
          {passwordError}
        </Text>
      )}

      <Button
        bg={colors.surfaceElevated}
        borderWidth={1}
        borderColor={colors.border}
        disabled={isChangingPassword}
        opacity={isChangingPassword ? 0.6 : 1}
        pressStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderStrong }}
        onPress={onChangePassword}
      >
        {isChangingPassword ? (
          <ActivityIndicator color={colors.textPrimary} />
        ) : (
          <Text color={colors.textPrimary} fontSize={14} fontWeight="600">
            Update Password
          </Text>
        )}
      </Button>
    </YStack>
  )
}

export default ChangePassword
