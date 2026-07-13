import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import places from '../../data/places'
import users from '../../data/users'
import ProfileHeader from './components/ProfileHeader'
import { SettingsMenu } from './components/SettingsMenu'
import UserCard from './components/UserCard'

const Profile = () => {
  const colors = useColors()
  const user = users[0]
  const place = places.find((p) => p.id === user.place_id)

  const userCardData = {
    name: user.name,
    avatar: user.avatar,
    placeName: place?.name || 'Unknown',
    rating: user.rating,
    reviewsCount: user.reviewsCount,
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ProfileHeader />
      <ScrollView bg={colors.background}>
        <YStack p="$4" gap="$4">
          <UserCard userCardData={userCardData} />
          <SettingsMenu />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
