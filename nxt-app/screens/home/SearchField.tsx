import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { CircleXIcon, Search } from 'lucide-react-native'
import { XStack, YStack } from 'tamagui'

import FormInput from '@components/FormInput'
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
        <FormInput
          flex={1}
          pl={40}
          pr={40}
          value={value}
          onChangeText={setValue}
          placeholder="Search services & listings..."
          fontSize={14}
          height={48}
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
