import { TouchableOpacity, useColorScheme } from 'react-native'

import { Check } from 'lucide-react-native'
import { Sheet, Text, Theme, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import issueCategories from '../../../data/issueCategories'

interface Props {
  isOpen: boolean
  onClose: () => void
  category: string
  onSelect: (category: string) => void
}

const IssueCategorySheet: React.FC<Props> = ({ isOpen, onClose, category, onSelect }) => {
  const colors = useColors()
  const colorScheme = useColorScheme()
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onClose()}
      snapPoints={[45, 25]}
      modal
      dismissOnSnapToBottom
      dismissOnOverlayPress
    >
      <Sheet.Overlay onPress={onClose} backgroundColor="rgba(0,0,0,0.5)" />
      <Sheet.Handle backgroundColor={colors.border} />
      <Sheet.Frame bg={colors.surfaceElevated} px="$4" pt="$2" pb="$8">
        <Theme name={colorScheme === 'light' ? 'light' : 'dark'}>
          <YStack gap="$1">
            {issueCategories.map((option) => {
              const isSelected = option === category

              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    onSelect(option)
                    onClose()
                  }}
                >
                  <XStack items="center" justify="space-between" py="$3" px="$2">
                    <Text color={colors.textPrimary} fontSize={15}>
                      {option}
                    </Text>
                    {isSelected && <Check size={18} color={colors.brand} />}
                  </XStack>
                </TouchableOpacity>
              )
            })}
          </YStack>
        </Theme>
      </Sheet.Frame>
    </Sheet>
  )
}

export default IssueCategorySheet
