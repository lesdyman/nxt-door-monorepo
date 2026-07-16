import { Pressable } from 'react-native'

import { Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

export type AuthorDetailsTab = 'listings' | 'reviews'

interface Props {
  activeTab: AuthorDetailsTab
  onChange: (tab: AuthorDetailsTab) => void
}

const TABS: { key: AuthorDetailsTab; label: string }[] = [
  { key: 'listings', label: 'Active Listings' },
  { key: 'reviews', label: 'Reviews' },
]

const AuthorDetailsTabs: React.FC<Props> = ({ activeTab, onChange }) => {
  const colors = useColors()
  return (
    <XStack borderBottomWidth={1} borderColor={colors.border} items="center">
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab
        return (
          <Pressable key={tab.key} style={{ flex: 1 }} onPress={() => onChange(tab.key)}>
            <YStack
              items="center"
              py="$3"
              borderBottomWidth={2}
              borderColor={isActive ? colors.brand : 'transparent'}
            >
              <Text
                color={isActive ? colors.brand : colors.textSecondary}
                fontSize={15}
                fontWeight={isActive ? '600' : '400'}
              >
                {tab.label}
              </Text>
            </YStack>
          </Pressable>
        )
      })}
    </XStack>
  )
}

export default AuthorDetailsTabs
