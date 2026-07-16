import { useMemo, useState } from 'react'
import { ScrollView } from 'react-native'

import { useRouter } from 'expo-router'
import { MessageSquareText, PackageSearch, StarOff } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, XStack, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import Post from '@components/Post/Post'
import User from '@constants/types/User'
import useColors from '@constants/useColors'

import mockListings from '../../data/mockListings'
import reviews from '../../data/reviews'
import users from '../../data/users'
import AuthorDetailsHeader from './components/AuthorDetailsHeader'
import AuthorDetailsTabs, { AuthorDetailsTab } from './components/AuthorDetailsTabs'
import NameAvatar from './components/NameAvatar'
import RateWidget from './components/RateWidget'
import ReviewCard from './components/ReviewCard'

interface Props {
  user: User
}

const AuthorDetails: React.FC<Props> = ({ user }) => {
  const colors = useColors()
  const [activeTab, setActiveTab] = useState<AuthorDetailsTab>('listings')
  const router = useRouter()

  const activeListings = useMemo(
    () =>
      mockListings.filter(
        (listing) => user.userPosts.includes(listing.id) && listing.status === 'active'
      ),
    [user.userPosts]
  )

  const userReviews = useMemo(
    () =>
      reviews
        .filter((review) => review.revieweeId === user.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [user.id]
  )

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <AuthorDetailsHeader />
      <View flex={1} bg={colors.background}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          <YStack gap="$4" px="$4" pt="$4" pb="$4">
            <NameAvatar user={{ name: user.name, avatar: user.avatar, place_id: user.place_id }} />

            <RateWidget rateData={{ rating: user.rating, reviewsCount: user.reviewsCount }} />
          </YStack>

          <YStack style={{ backgroundColor: colors.background }}>
            <AuthorDetailsTabs activeTab={activeTab} onChange={setActiveTab} />
          </YStack>

          {activeTab === 'listings' ? (
            <YStack gap="$4" px="$4" pt="$4" pb="$4">
              {activeListings.length === 0 ? (
                <YStack items="center" gap="$2" pt="$6">
                  <PackageSearch color={colors.textSecondary} size={32} />
                  <Text color={colors.textSecondary} fontSize={15} text="center">
                    No active listings yet
                  </Text>
                </YStack>
              ) : (
                activeListings.map((listing) => (
                  <Post
                    key={listing.id}
                    data={listing}
                    onPress={() => router.push(`/listing/${listing.id}`)}
                  />
                ))
              )}
            </YStack>
          ) : (
            <YStack gap="$3" px="$4" pt="$4" pb="$4">
              {userReviews.length === 0 ? (
                <YStack items="center" gap="$2" pt="$6">
                  <StarOff color={colors.textSecondary} size={32} />
                  <Text color={colors.textSecondary} fontSize={15} text="center">
                    No reviews yet
                  </Text>
                </YStack>
              ) : (
                userReviews.map((review) => {
                  const reviewer = users.find((u) => u.id === review.reviewerId)
                  const listing = mockListings.find((l) => l.id === review.listingId)
                  if (!reviewer || !listing) return null

                  return (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      reviewer={{ name: reviewer.name, avatar: reviewer.avatar }}
                      listingTitle={listing.title}
                      onPressListing={() => router.push(`/listing/${listing.id}`)}
                    />
                  )
                })
              )}
            </YStack>
          )}
        </ScrollView>
        <View px="$4" bg={colors.background} py="$3" borderTopWidth={1} borderColor={colors.border}>
          <BrandButton>
            <XStack items="center" gap="$2">
              <MessageSquareText color={colors.white} height={20} width={20} />
              <Text color={colors.white} fontSize={16} lineHeight={24}>
                Message {user.name.split(' ')[0]}
              </Text>
            </XStack>
          </BrandButton>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AuthorDetails
