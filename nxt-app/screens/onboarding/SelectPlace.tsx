import { useState } from 'react'

import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import PlaceSelect from '@components/PlaceSelect/PlaceSelect'
import useColors from '@constants/useColors'
import { useOnboarding } from '@contexts/OnboardingContext'

import OnboardingStepHeader from './components/OnboardingStepHeader'
import BuildingIcon from './icons/BuildingIcon'

const SelectPlace = () => {
  const colors = useColors()
  const router = useRouter()
  const { setPlaceId } = useOnboarding()
  const [selectedPlaceId, setSelectedPlaceId] = useState('')

  const handleNext = () => {
    setPlaceId(selectedPlaceId)
    router.push('/onboarding/profile')
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <OnboardingStepHeader step={1} totalSteps={3} showBackButton={false} />
      <YStack flex={1} items="center" justify="space-between" p="$4">
        <YStack items="center" gap="$4" width="100%">
          <BuildingIcon size={180} color={colors.border} />
          <YStack items="center" gap="$2">
            <Text fontSize={20} fontWeight="700" color={colors.textPrimary}>
              Select Your Place
            </Text>
            <Text text="center" fontSize={14} color={colors.textMuted}>
              Choose your residential complex to see marketplace items and community requests from
              your neighbors.
            </Text>
          </YStack>

          <PlaceSelect value={selectedPlaceId} onValueChange={setSelectedPlaceId} />
        </YStack>

        <YStack gap="$4" width="100%">
          <BrandButton
            onPress={handleNext}
            disabled={!selectedPlaceId}
            opacity={selectedPlaceId ? 1 : 0.6}
          >
            <Text color={colors.white} fontSize={16}>
              Confirm Place Selection
            </Text>
          </BrandButton>
          <Text text="center" fontSize={12} lineHeight={16} color={colors.textMuted}>
            By continuing, you agree to our Community Guidelines
          </Text>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}

export default SelectPlace
