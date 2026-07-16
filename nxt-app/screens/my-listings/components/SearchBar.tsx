import { TouchableOpacity } from 'react-native'

import { CircleXIcon, ListFilter, Search } from 'lucide-react-native'
import { Button, Input, XStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  search: string
  setSearch: (value: string) => void
}

const SearchBar: React.FC<Props> = ({ search, setSearch }) => {
  const colors = useColors()
  return (
    <XStack px="$4" py="$2" gap="$2" items="center" justify="space-between" bg={colors.background}>
      <XStack position="relative" items="center" flex={1}>
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
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="$gray9"
          placeholder="Search your posts..."
          fontSize={14}
          height={48}
          color={colors.textPrimary}
          borderColor={colors.border}
          focusStyle={{ borderColor: colors.borderFocus }}
          style={{ backgroundColor: colors.surface }}
          cursorColor={colors.textPrimary}
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearch('')}
            style={{ position: 'absolute', right: 12, zIndex: 1 }}
          >
            <CircleXIcon width={20} height={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </XStack>
      <Button
        height={48}
        bg={colors.surface}
        borderColor={colors.border}
        focusStyle={{ borderColor: colors.borderFocus }}
        pressStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderFocus }}
      >
        <ListFilter width={16} height={16} color={colors.textPrimary} />
      </Button>
    </XStack>
  )
}

export default SearchBar
