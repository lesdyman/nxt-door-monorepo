import { Text, XStack, YStack } from 'tamagui'

import Filter from '@components/shared/Filter/Filter'
import useColors from '@constants/useColors'
import { useSearch } from '@contexts/SearchContext'

const QUICK_FILTERS = [
  'Urgent',
  'Free',
  'Today Only',
  'Barter',
  'With photo',
  'Offers only',
  'Requests only',
]

const QuickFilters = () => {
  const colors = useColors()
  const { activeFilters, toggleFilter } = useSearch()
  const safeFilters = Array.isArray(activeFilters) ? activeFilters : []

  return (
    <YStack gap="$3">
      <Text fontSize={20} fontWeight="600" color={colors.textPrimary}>
        Quick Filters
      </Text>
      <XStack gap="$2" flexWrap="wrap">
        {QUICK_FILTERS.map((filter) => {
          const isActive = safeFilters.includes(filter)
          return (
            <Filter key={filter} filter={filter} isActive={isActive} toggleFilter={toggleFilter} />
          )
        })}
      </XStack>
    </YStack>
  )
}

export default QuickFilters
