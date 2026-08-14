import { useState } from 'react'

import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import AvatarPicker from '@components/AvatarPicker/AvatarPicker'
import BrandButton from '@components/BrandButton'
import FormInput from '@components/FormInput'
import useColors from '@constants/useColors'
import { useOnboarding } from '@contexts/OnboardingContext'
import { authClient } from '@services/authClient'

import OnboardingStepHeader from './components/OnboardingStepHeader'

const ConfirmProfile = () => {
  const colors = useColors()
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const { data: onboarding, setProfile, setAvatarUrl } = useOnboarding()

  const [name, setName] = useState(session?.user?.name ?? '')
  const [email, setEmail] = useState(session?.user?.email ?? '')
  const [showErrors, setShowErrors] = useState(false)

  const nameError = name.trim().length === 0 ? 'Display name is required' : null
  const emailError = email.trim().length === 0 ? 'Email is required' : null
  const isValid = !nameError && !emailError

  const handleNext = () => {
    if (!isValid) {
      setShowErrors(true)
      return
    }
    setProfile(name.trim(), email.trim())
    router.push('/onboarding/success')
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <OnboardingStepHeader step={2} totalSteps={3} />
      <YStack flex={1} justify="space-between" p="$4">
        <YStack gap="$4">
          <Text text="center" fontSize={24} fontWeight="700" color={colors.textPrimary}>
            Confirm Your Profile
          </Text>

          <YStack gap="$8">
            <YStack gap="$2">
              <Text ml="$1" fontSize={14} fontWeight="500" lineHeight={20} color={colors.amber}>
                Upload a profile picture
              </Text>
              <AvatarPicker avatarUrl={onboarding.avatarUrl} onAvatarChange={setAvatarUrl} />
            </YStack>

            <YStack gap="$6">
              <YStack gap="$2">
                <Text ml="$1" fontSize={14} fontWeight="500" lineHeight={20} color={colors.amber}>
                  Is this your correct display name?*
                </Text>
                <FormInput placeholder="Display name" value={name} onChangeText={setName} />
                {showErrors && nameError && (
                  <Text ml="$1" fontSize={12} color={colors.notificationDot}>
                    {nameError}
                  </Text>
                )}
              </YStack>
              <YStack gap="$2">
                <Text ml="$1" fontSize={14} fontWeight="500" lineHeight={20} color={colors.amber}>
                  Is this your correct email?*
                </Text>
                <FormInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {showErrors && emailError && (
                  <Text ml="$1" fontSize={12} color={colors.notificationDot}>
                    {emailError}
                  </Text>
                )}
              </YStack>
            </YStack>
          </YStack>
        </YStack>

        <BrandButton onPress={handleNext} disabled={!isValid} opacity={isValid ? 1 : 0.6}>
          <Text color={colors.white} fontSize={16}>
            Confirm & Continue
          </Text>
        </BrandButton>
      </YStack>
    </SafeAreaView>
  )
}

export default ConfirmProfile
