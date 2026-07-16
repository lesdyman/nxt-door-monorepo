import { ActivityIndicator, FlatList } from 'react-native'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import FilterBar from '@components/FilterBar/FilterBar'
import Header from '@components/Header'
import Post from '@components/Post/Post'
import TabHeader from '@components/TabHeader'
import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'
import { useTabBar } from '@contexts/TabBarContext'
import usePostsInfinity from '@hooks/usePostsInfinity'

export default function OrdersScreen() {
  const colors = useColors()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { onScroll } = useTabBar()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsInfinity('order', 20)
  const orders = data?.pages.flat() ?? []

  const handlePress = (item: Listing) => {
    queryClient.setQueryData(['postDetails', item.id], item)
    router.push(`/orders/${item.id}`)
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <Header>
        <TabHeader title="All Requests" searchFilter="Requests only" />
      </Header>
      <YStack pt="$3" flex={1}>
        <FilterBar />
        <FlatList
          data={orders}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Post data={item} onPress={() => handlePress(item)} />}
          ItemSeparatorComponent={() => <YStack height={13} />}
          contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator color={colors.brand} style={{ marginVertical: 16 }} />
            ) : null
          }
        />
      </YStack>
    </SafeAreaView>
  )
}
