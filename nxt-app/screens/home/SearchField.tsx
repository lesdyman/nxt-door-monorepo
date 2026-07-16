import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { CircleXIcon, Search } from 'lucide-react-native'
import { Input, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const SearchField = () => {
  const colors = useColors()
  const [value, setValue] = useState('')

  return (
    <YStack width="100%" mt="$4">
      <XStack position="relative" items="center">
        <Search
          width={16}
          height={16}
          color={colors.textSecondary}
          style={{ position: 'absolute', left: 12, zIndex: 1 }}
        />
        <Input
          flex={1}
          pl={40}
          pr={40}
          value={value}
          onChangeText={setValue}
          placeholderTextColor="$gray9"
          placeholder="Search services & listings..."
          fontSize={14}
          height={48}
          color={colors.textPrimary}
          borderColor={colors.border}
          focusStyle={{ borderColor: colors.borderFocus }}
          style={{ backgroundColor: colors.surface }}
          cursorColor={colors.textPrimary}
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => setValue('')}
            style={{ position: 'absolute', right: 12, zIndex: 1 }}
          >
            <CircleXIcon width={20} height={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </XStack>
    </YStack>
  )
}

export default SearchField
