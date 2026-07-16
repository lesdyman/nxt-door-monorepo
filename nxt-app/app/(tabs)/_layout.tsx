import { Pressable, View } from 'react-native'

import { Tabs, useRouter } from 'expo-router'
import { CirclePlus, ClipboardList, Home, Store, User } from 'lucide-react-native'

import AnimatedTabBar from '@components/AnimatedTabBar'
import SearchModal from '@components/SearchModal'
import useColors from '@constants/useColors'

import { SearchProvider } from '../../contexts/SearchContext'
import { TabBarProvider } from '../../contexts/TabBarContext'

export default function TabsLayout() {
  const colors = useColors()
  const router = useRouter()
  return (
    <TabBarProvider>
      <SearchProvider>
        <SearchModal />
        <Tabs
          tabBar={(props) => <AnimatedTabBar {...props} />}
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: colors.tabBarBg, borderTopColor: colors.borderStrong },
            tabBarLabelStyle: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
            tabBarActiveTintColor: colors.brand,
            tabBarInactiveTintColor: colors.textSecondary,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <Home color={color} size={18} />,
            }}
          />
          <Tabs.Screen
            name="listings"
            options={{
              title: 'Listings',
              tabBarIcon: ({ color }) => <Store color={color} size={18} />,
            }}
          />
          <Tabs.Screen
            name="add"
            options={{
              title: 'Add',
              tabBarIcon: () => (
                <View
                  style={{
                    height: 26,
                    width: 26,
                    borderRadius: 13,
                    backgroundColor: colors.brand,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CirclePlus color={colors.white} size={16} />
                </View>
              ),
              tabBarButton: ({
                children,
                style,
                testID,
                accessibilityLabel,
                accessibilityRole,
                accessibilityState,
                onLongPress,
              }) => (
                <Pressable
                  onPress={() => router.push('/new-post')}
                  onLongPress={onLongPress}
                  style={style}
                  testID={testID}
                  accessibilityLabel={accessibilityLabel}
                  accessibilityRole={accessibilityRole}
                  accessibilityState={accessibilityState}
                >
                  {children}
                </Pressable>
              ),
            }}
          />
          <Tabs.Screen
            name="orders"
            options={{
              title: 'Orders',
              tabBarIcon: ({ color }) => <ClipboardList color={color} size={18} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <User color={color} size={18} />,
            }}
          />
        </Tabs>
      </SearchProvider>
    </TabBarProvider>
  )
}
