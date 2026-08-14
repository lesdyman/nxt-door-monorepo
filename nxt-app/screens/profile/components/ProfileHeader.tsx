import { useRouter } from 'expo-router'
import { Settings } from 'lucide-react-native'
import { Text, XStack } from 'tamagui'

import BellIcon from '@components/BellIcon'
import Header from '@components/Header'
import HeaderIconButton from '@components/HeaderIconButton'
import useColors from '@constants/useColors'

const ProfileHeader = () => {
  const colors = useColors()
  const router = useRouter()

  return (
    <Header>
      <Text fontSize={20} fontWeight="600" lineHeight={28} color={colors.textPrimary}>
        Profile
      </Text>
      <XStack gap="$2" items="center">
        <HeaderIconButton icon={<BellIcon />} onPress={() => router.push('/info-center')} />
        <HeaderIconButton icon={<Settings />} onPress={() => router.push('/settings')} />
      </XStack>
    </Header>
  )
}

export default ProfileHeader
