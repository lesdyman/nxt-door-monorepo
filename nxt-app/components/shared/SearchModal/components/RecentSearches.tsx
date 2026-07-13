import { TouchableOpacity } from 'react-native'

import { History, MoveUpLeft } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const RECENT_SEARCHES = ['Handyman', 'Bicycle repair near me', 'Tennis coach for kids']

const RecentSearches = () => {
  const colors = useColors()
  return (
    <YStack justify="center">
      <XStack justify="space-between" items="center" gap="$4">
        <Text fontSize={20} color={colors.textPrimary} lineHeight={28} fontWeight="600">
          Recent Searches
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text
            color={colors.brand}
            fontSize={14}
            letterSpacing={0.12}
            lineHeight={16}
            fontWeight="500"
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </XStack>

      <YStack mt="$4" gap="$1">
        {RECENT_SEARCHES.map((query) => (
          <TouchableOpacity key={query} onPress={() => {}}>
            <XStack items="center" gap="$3" px="$2" py="$3">
              <History width={16} height={16} color={colors.mist} />
              <Text color={colors.textPrimary} fontSize={14} lineHeight={20} ml="$2">
                {query}
              </Text>
              <MoveUpLeft
                width={16}
                height={16}
                color={colors.mist}
                opacity={0.5}
                style={{ marginLeft: 'auto' }}
              />
            </XStack>
          </TouchableOpacity>
        ))}
      </YStack>
    </YStack>
  )
}

export default RecentSearches
