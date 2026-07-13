import { useState } from 'react'
import { ScrollView, useColorScheme } from 'react-native'

import { Sheet, Text, Theme, YStack } from 'tamagui'

import BrandButton from '@components/shared/BrandButton'
import useColors from '@constants/useColors'

import FilterSheetCategories from './components/FilterSheetCategoris'
import FilterSheetHeader from './components/FilterSheetHeader'
import FilterSheetPrice from './components/FilterSheetPrice'
import FilterSheetSortBy from './components/FilterSheetSortBy'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const FilterSheet: React.FC<Props> = ({ isOpen, onClose }) => {
  const colors = useColors()
  const colorScheme = useColorScheme()
  const [sortBy, setSortBy] = useState('newest')

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onClose()}
      snapPoints={[83, 50, 25]}
      modal
      dismissOnSnapToBottom
      dismissOnOverlayPress
    >
      <Sheet.Overlay onPress={onClose} backgroundColor="rgba(0,0,0,0.5)" />
      <Sheet.Handle backgroundColor={colors.border} />
      <Sheet.Frame bg={colors.surfaceElevated} flex={1}>
        <Theme name={colorScheme === 'light' ? 'light' : 'dark'}>
          <YStack flex={1} gap="$3">
            <FilterSheetHeader onClose={onClose} />

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              <YStack gap="$6" p="$4">
                <FilterSheetCategories />
                <FilterSheetPrice />
                <FilterSheetSortBy sortBy={sortBy} setSortBy={setSortBy} />
              </YStack>
            </ScrollView>

            <YStack
              px="$4"
              pb="$8"
              pt="$3"
              bg={colors.surfaceElevated}
              borderTopWidth={1}
              borderTopColor={colors.border}
            >
              <BrandButton>
                <Text color={colors.white} fontSize={20} lineHeight={28} fontWeight="600">
                  Show results
                </Text>
              </BrandButton>
            </YStack>
          </YStack>
        </Theme>
      </Sheet.Frame>
    </Sheet>
  )
}

export default FilterSheet
