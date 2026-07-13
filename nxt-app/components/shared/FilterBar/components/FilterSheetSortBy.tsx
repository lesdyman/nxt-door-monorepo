import { useId } from 'react'

import { Label, RadioGroup, Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  sortBy: string
  setSortBy: (value: string) => void
}

const FilterSheetSortBy: React.FC<Props> = ({ sortBy, setSortBy }) => {
  const colors = useColors()
  const instanceId = useId()

  const sortByOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'priceLowHigh', label: 'Price: Low-High' },
    { value: 'priceHighLow', label: 'Price: High-Low' },
  ]

  return (
    <YStack gap="$2">
      <Text
        color={colors.mist}
        fontSize={14}
        lineHeight={20}
        fontWeight="500"
        textTransform="uppercase"
      >
        Sort by
      </Text>
      <RadioGroup value={sortBy} onValueChange={setSortBy} orientation="vertical" gap="$2">
        {sortByOptions.map(({ value, label }) => {
          const isSelected = sortBy === value
          const inputId = `${instanceId}-${value}`

          return (
            <XStack
              key={value}
              items="center"
              justify="space-between"
              gap="$2"
              borderWidth={1}
              borderColor={colors.border}
              rounded={10}
              p="$3"
              bg={colors.surfaceElevated}
              onPress={() => setSortBy(value)}
            >
              <Label fontSize={14} lineHeight={20} color={colors.textPrimary} htmlFor={inputId}>
                {label}
              </Label>
              <RadioGroup.Item
                value={value}
                id={inputId}
                borderColor={isSelected ? colors.brand : colors.border}
                bg={isSelected ? colors.brand : colors.surfaceElevated}
                pressStyle={{
                  bg: colors.buttonPressedBg,
                  borderColor: colors.borderStrong,
                }}
                focusStyle={{
                  bg: colors.buttonPressedBg,
                  borderColor: colors.borderStrong,
                }}
              >
                <RadioGroup.Indicator bg={colors.white} />
              </RadioGroup.Item>
            </XStack>
          )
        })}
      </RadioGroup>
    </YStack>
  )
}

export default FilterSheetSortBy
