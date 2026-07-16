import { useState } from 'react'
import { View } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { Settings2 } from 'lucide-react-native'
import { ScrollView, XStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import useColors from '@constants/useColors'

import Filter from '../Filter/Filter'
import FilterSheet from './FilterSheet'

const filters = ['Price: Low-High', 'Price: High-Low', 'Free', 'Newest first', 'Oldest first']

const FilterBar = () => {
  const colors = useColors()
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  return (
    <XStack gap="$2" px="$4" pb="$3" items="center">
      <View style={{ flex: 1 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$3">
            {filters.map((filter) => (
              <Filter
                key={filter}
                filter={filter}
                fontSize={16}
                isActive={false}
                toggleFilter={() => {}}
              />
            ))}
          </XStack>
        </ScrollView>
        <LinearGradient
          colors={['transparent', colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 0 }}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 8,
            pointerEvents: 'none',
          }}
        />
      </View>
      <BrandButton
        height={42}
        color={colors.white}
        icon={Settings2}
        onPress={() => setIsFilterSheetOpen(true)}
      />
      <FilterSheet isOpen={isFilterSheetOpen} onClose={() => setIsFilterSheetOpen(false)} />
    </XStack>
  )
}

export default FilterBar
