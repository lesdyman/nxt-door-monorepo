import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Check, ChevronDown } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Adapt, Select, Sheet, Text, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import useColors from '@constants/useColors'
import { useOnboarding } from '@contexts/OnboardingContext'
import placesService from '@services/placesService'

import OnboardingStepHeader from './components/OnboardingStepHeader'
import BuildingIcon from './icons/BuildingIcon'

const SelectPlace = () => {
  const colors = useColors()
  const router = useRouter()
  const { setPlaceId } = useOnboarding()
  const [selectedPlaceId, setSelectedPlaceId] = useState('')

  const { data: places = [] } = useQuery({
    queryKey: ['places'],
    queryFn: placesService.getPlaces,
  })

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

          <Select value={selectedPlaceId} onValueChange={setSelectedPlaceId}>
            <Select.Trigger
              width="100%"
              bg={colors.surface}
              borderColor={colors.border}
              iconAfter={<ChevronDown size={16} color={colors.textSecondary} />}
            >
              <Select.Value
                placeholder="Search residential complex..."
                color={colors.textPrimary}
              />
            </Select.Trigger>

            <Adapt platform="touch">
              <Sheet modal dismissOnSnapToBottom snapPointsMode="percent" snapPoints={[50]}>
                <Sheet.Frame bg={colors.surfaceElevated}>
                  <Sheet.Handle bg={colors.borderStrong} />
                  <Sheet.ScrollView showsVerticalScrollIndicator={false}>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
                  bg="rgba(0, 0, 0, 0.5)"
                />
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.Viewport>
                <Select.Group gap="$2" pt="$5" px="$2">
                  {places.map((place, index) => (
                    <Select.Item bg={colors.surface} index={index} key={place.id} value={place.id}>
                      <Select.ItemText fontSize={16} color={colors.textPrimary} fontWeight="500">
                        {place.name}
                      </Select.ItemText>
                      <Select.ItemIndicator ml="auto">
                        <Check size={16} color={colors.brand} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select>
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
