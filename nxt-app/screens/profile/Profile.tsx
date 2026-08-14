import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, YStack } from 'tamagui'

import useColors from '@constants/useColors'
import useCurrentUser from '@hooks/useCurrentUser'

import ProfileHeader from './components/ProfileHeader'
import UserCard from './components/UserCard'
import { UserMenu } from './components/UserMenu'

const Profile = () => {
  const colors = useColors()
  const { user, place } = useCurrentUser()

  const userCardData = {
    name: user?.name,
    avatar: user?.avatar,
    placeName: place?.name || 'Unknown',
    rating: user?.rating,
    reviewsCount: user?.reviewsCount,
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ProfileHeader />
      <ScrollView bg={colors.background}>
        <YStack p="$4" gap="$4">
          <UserCard userCardData={userCardData} />
          <UserMenu />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
