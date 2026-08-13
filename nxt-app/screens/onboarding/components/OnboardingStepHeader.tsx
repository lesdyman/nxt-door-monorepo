import { TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { Text, View, XStack, YStack } from 'tamagui'

import Header from '@components/Header'
import useColors from '@constants/useColors'

interface Props {
  step: number
  totalSteps: number
  showBackButton?: boolean
}

const OnboardingStepHeader: React.FC<Props> = ({ step, totalSteps, showBackButton = true }) => {
  const colors = useColors()
  const router = useRouter()

  return (
    <YStack>
      <Header showBorder={false}>
        {showBackButton ? (
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View width={22} />
        )}
        <Text fontSize={14} fontWeight="600" color={colors.textMuted}>
          Step {step} of {totalSteps}
        </Text>
        <View width={22} />
      </Header>
      <XStack gap="$1.5" px="$1.5">
        {Array.from({ length: totalSteps }, (_, index) => (
          <View
            key={index}
            flex={1}
            height={4}
            rounded="$10"
            bg={index < step ? colors.brand : colors.border}
          />
        ))}
      </XStack>
    </YStack>
  )
}

export default OnboardingStepHeader
