import { useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Text, YStack } from 'tamagui'
import { z } from 'zod'

import AvatarPicker from '@components/AvatarPicker/AvatarPicker'
import BrandButton from '@components/BrandButton'
import FormInput from '@components/FormInput'
import PlaceSelect from '@components/PlaceSelect/PlaceSelect'
import useColors from '@constants/useColors'
import { useAuth } from '@contexts/AuthContext'
import useCurrentUser from '@hooks/useCurrentUser'
import { authClient } from '@services/authClient'
import userService from '@services/userService'

const settingsSchema = z.object({
  name: z.string().min(1, 'Display name is required'),
  avatarUrl: z.string().nullable(),
  placeId: z.string().min(1, 'Please select your residential complex'),
})

const ChangeNameEmailPlace = () => {
  const colors = useColors()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { userId } = useAuth()
  const { user } = useCurrentUser()
  const { data: session } = authClient.useSession()

  const [initializedUserId, setInitializedUserId] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: { name: '', avatarUrl: null as string | null, placeId: '' },
  })

  if (user && user.id !== initializedUserId) {
    reset({ name: user.name, avatarUrl: user.avatar, placeId: user.placeId })
    setInitializedUserId(user.id)
  }

  const avatarUrl = useWatch({ control, name: 'avatarUrl' })

  const onSubmit = handleSubmit(async (data) => {
    if (!userId) return
    await userService.updateUser(userId, {
      name: data.name.trim(),
      avatar: data.avatarUrl,
      placeId: data.placeId,
    })
    await queryClient.invalidateQueries({ queryKey: ['user', userId] })
    await queryClient.invalidateQueries({ queryKey: ['currentUser', userId] })
    router.back()
  })

  return (
    <YStack gap="$6">
      <AvatarPicker
        avatarUrl={avatarUrl}
        onAvatarChange={(url) => setValue('avatarUrl', url, { shouldDirty: true })}
        onAvatarRemove={() => setValue('avatarUrl', null, { shouldDirty: true })}
      />

      <YStack gap="$4">
        <YStack gap="$2">
          <Text ml="$1" fontSize={14} fontWeight="500" lineHeight={20} color={colors.textSecondary}>
            Display name
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange, onBlur } }) => (
              <FormInput
                placeholder="Display name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.name && (
            <Text ml="$1" fontSize={12} color={colors.notificationDot}>
              {errors.name.message}
            </Text>
          )}
        </YStack>

        <YStack gap="$2">
          <Text ml="$1" fontSize={14} fontWeight="500" lineHeight={20} color={colors.textSecondary}>
            Email
          </Text>
          <YStack
            bg={colors.surface}
            borderWidth={1}
            borderColor={colors.border}
            rounded="$4"
            px="$3"
            py="$3"
            opacity={0.6}
          >
            <Text color={colors.textPrimary}>{session?.user?.email ?? ''}</Text>
          </YStack>
        </YStack>

        <YStack gap="$2">
          <Text ml="$1" fontSize={14} fontWeight="500" lineHeight={20} color={colors.textSecondary}>
            Residential complex
          </Text>
          <Controller
            control={control}
            name="placeId"
            render={({ field: { value, onChange } }) => (
              <PlaceSelect value={value} onValueChange={onChange} />
            )}
          />
          {errors.placeId && (
            <Text ml="$1" fontSize={12} color={colors.notificationDot}>
              {errors.placeId.message}
            </Text>
          )}
        </YStack>
      </YStack>

      <BrandButton onPress={onSubmit} disabled={isSubmitting} opacity={isSubmitting ? 0.6 : 1}>
        {isSubmitting ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text color={colors.white} fontSize={16}>
            Save Changes
          </Text>
        )}
      </BrandButton>
    </YStack>
  )
}

export default ChangeNameEmailPlace
