import { useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import useColors from '@constants/useColors'
import { useAuth } from '@contexts/AuthContext'
import { useOnboarding } from '@contexts/OnboardingContext'
import placesService from '@services/placesService'
import userService from '@services/userService'

import OnboardingStepHeader from './components/OnboardingStepHeader'
import HouseIcon from './icons/HouseIcon'
import OnboardingSuccessIcon from './icons/OnboardingSuccessIcon'

const OnboardingSuccess = () => {
  const colors = useColors()
  const { userId } = useAuth()
  const queryClient = useQueryClient()
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  const { placeId, name, avatarUrl } = useOnboarding().data

  const { data: place } = useQuery({
    queryKey: ['place', placeId],
    queryFn: () => placesService.getPlace(placeId as string),
    enabled: !!placeId,
  })

  const handleContinue = async () => {
    if (!placeId) return

    setIsCreatingUser(true)
    try {
      await userService.createUser({ name, avatar: avatarUrl ?? undefined, placeId })
      await queryClient.invalidateQueries({ queryKey: ['currentUser', userId] })
    } finally {
      setIsCreatingUser(false)
    }
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <OnboardingStepHeader step={3} totalSteps={3} />
      <YStack flex={1} gap="$4" p="$4" bg={colors.background} justify="space-between">
        <YStack gap="$4">
          <View
            rounded={999}
            justify="center"
            items="center"
            self="center"
            width={180}
            height={180}
            bg="rgba(164, 201, 255, 0.05)"
            style={{
              boxShadow: [
                {
                  offsetX: 0,
                  offsetY: 0,
                  blurRadius: 40,
                  spreadDistance: 10,
                  color: 'rgba(0, 144, 255, 0.15)',
                },
              ],
            }}
          >
            <View
              justify="center"
              items="center"
              borderWidth={1}
              position="relative"
              p={32}
              self="center"
              rounded={24}
              borderColor={colors.borderStrong}
              bg={colors.ink}
            >
              <HouseIcon size={52} color={colors.iconSubtle} />
              <View style={{ position: 'absolute', bottom: -8, right: -8 }}>
                <OnboardingSuccessIcon />
              </View>
            </View>
          </View>

          <YStack gap="$2">
            <Text fontSize={28} fontWeight="700" text="center" color={colors.textPrimary}>
              You&apos;re all set!
            </Text>
            <Text fontSize={16} color={colors.textMuted} text="center">
              Your account is ready. You&rsquo;re now connected to the{' '}
              <Text fontWeight="600" color={colors.linkAccent}>
                {place?.name}{' '}
              </Text>
              complex community.
            </Text>
          </YStack>
        </YStack>

        <BrandButton
          disabled={isCreatingUser}
          opacity={isCreatingUser ? 0.6 : 1}
          onPress={handleContinue}
        >
          {isCreatingUser ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text color={colors.white} fontSize={16}>
              Get Started
            </Text>
          )}
        </BrandButton>
      </YStack>
    </SafeAreaView>
  )
}

export default OnboardingSuccess
