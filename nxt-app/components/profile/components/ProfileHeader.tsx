import { useRouter } from 'expo-router'
import { Text } from 'tamagui'

import BellIcon from '@components/shared/BellIcon'
import Header from '@components/shared/Header'
import HeaderIconButton from '@components/shared/HeaderIconButton'
import useColors from '@constants/useColors'

const ProfileHeader = () => {
  const colors = useColors()
  const router = useRouter()

  return (
    <Header>
      <Text fontSize={20} fontWeight="600" lineHeight={28} color={colors.textPrimary}>
        Profile
      </Text>
      <HeaderIconButton icon={<BellIcon />} onPress={() => router.push('/info-center')} />
    </Header>
  )
}

export default ProfileHeader
