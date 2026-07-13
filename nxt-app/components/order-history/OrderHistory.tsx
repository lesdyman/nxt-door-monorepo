import { ScrollView } from 'react-native'

import { useRouter } from 'expo-router'
import { BookOpen } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import BackHeader from '@components/shared/BackHeader'
import useColors from '@constants/useColors'

import mockListings from '../../data/mockListings'
import users from '../../data/users'
import OrderHistoryCard from './components/OrderHistoryCard'

const currentUser = users[0]

const OrderHistory = () => {
  const colors = useColors()
  const router = useRouter()
  const pastTransactions = mockListings
    .filter((listing) => listing.userId === currentUser.id && listing.status === 'closed')
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader title="Order History" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {pastTransactions.length > 0 ? (
          <YStack gap="$3" px="$4" py="$4">
            {pastTransactions.map((listing) => (
              <OrderHistoryCard
                key={listing.id}
                listing={listing}
                onPressDetails={() => router.push(`/listing/${listing.id}`)}
              />
            ))}
          </YStack>
        ) : (
          <YStack flex={1} items="center" justify="center" gap="$2" px="$4" py="$12">
            <BookOpen color={colors.textSecondary} size={32} />
            <Text color={colors.textSecondary} fontSize={15} text="center">
              No past transactions yet
            </Text>
          </YStack>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default OrderHistory
