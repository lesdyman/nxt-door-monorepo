import { Button, ScrollView, Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import CATEGORY_EMOJI from '../../../../utils/categoryEmoji'

const FilterSheetCategories = () => {
  const colors = useColors()
  const categories = Object.keys(CATEGORY_EMOJI)
  return (
    <YStack gap="$3">
      <Text
        fontSize={14}
        fontWeight="500"
        lineHeight={20}
        letterSpacing={0.7}
        color={colors.mist}
        textTransform="uppercase"
      >
        Categories
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$2">
          <Button
            bg={colors.accent}
            borderWidth={1}
            borderColor={colors.border}
            rounded={10}
            pressStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderStrong }}
            focusStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderStrong }}
          >
            <Text fontSize={12} letterSpacing={0.12} fontWeight="500" color={colors.mist}>
              All
            </Text>
          </Button>
          {categories.map((category) => (
            <Button
              bg="transparent"
              borderWidth={1}
              borderColor={colors.border}
              rounded={10}
              key={category}
              pressStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderStrong }}
              focusStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderStrong }}
            >
              <Text fontSize={12} letterSpacing={0.12} fontWeight="500" color={colors.mist}>
                {category}
              </Text>
            </Button>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  )
}

export default FilterSheetCategories
