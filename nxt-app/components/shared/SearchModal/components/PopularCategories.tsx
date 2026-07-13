import { TouchableOpacity } from 'react-native'

import { Dumbbell, LucideIcon, Refrigerator, UtensilsCrossed, Wrench } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const CATEGORIES: { label: string; Icon: LucideIcon }[] = [
  { label: 'Appliances', Icon: Refrigerator },
  { label: 'Sport', Icon: Dumbbell },
  { label: 'Food', Icon: UtensilsCrossed },
  { label: 'Services', Icon: Wrench },
]
const PopularCategories = () => {
  const colors = useColors()
  return (
    <YStack gap="$4">
      <Text color={colors.textPrimary} fontSize={20} fontWeight="600">
        Popular Categories
      </Text>

      <XStack flexWrap="wrap" gap="$3">
        {CATEGORIES.map(({ label, Icon }) => (
          <TouchableOpacity
            key={label}
            onPress={() => {}}
            style={{
              width: '47%',
              paddingVertical: 16,
              alignItems: 'center',
              gap: 8,
              borderRadius: 12,
              backgroundColor: colors.tabBarBg,
              borderColor: 'rgba(64, 71, 83, 0.3)',
              borderWidth: 1,
            }}
          >
            <Icon width={28} height={28} color={colors.brand} />
            <Text fontSize={14} color={colors.textPrimary} fontWeight="500">
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </XStack>
    </YStack>
  )
}

export default PopularCategories
