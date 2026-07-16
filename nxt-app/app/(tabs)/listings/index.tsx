import { ActivityIndicator, FlatList } from 'react-native'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import FilterBar from '@components/shared/FilterBar/FilterBar'
import Header from '@components/shared/Header'
import Post from '@components/shared/Post/Post'
import TabHeader from '@components/shared/TabHeader'
import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'
import { useTabBar } from '@contexts/TabBarContext'
import usePostsInfinity from '@hooks/usePostsInfinity'

export default function ListingsScreen() {
  const colors = useColors()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { onScroll } = useTabBar()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsInfinity('offer', 20)
  const listings = data?.pages.flat() ?? []

  const handlePress = (item: Listing) => {
    queryClient.setQueryData(['postDetails', item.id], item)
    router.push(`/listings/${item.id}`)
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <Header>
        <TabHeader title="All Offers" searchFilter="Offers only" />
      </Header>
      <YStack pt="$3" flex={1}>
        <FilterBar />
        <FlatList
          data={listings}
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
