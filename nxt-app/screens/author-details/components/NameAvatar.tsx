import { MapPin } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import UserAvatar from '@components/UserAvatar'
import useColors from '@constants/useColors'
import usePlace from '@hooks/usePlace'

interface Props {
  user: {
    name: string
    avatar: string | null
    placeId: string
  }
}

const NameAvatar: React.FC<Props> = ({ user }) => {
  const colors = useColors()
  const { data: place } = usePlace(user.placeId)
  const userAddress = place
  return (
    <YStack gap="$3" items="center">
      <UserAvatar
        name={user.name}
        avatarUrl={user.avatar}
        size={96}
        borderWidth={2}
        borderColor={colors.avatarBorder}
      />

      <YStack gap="$1" items="center">
        <Text
          color={colors.textPrimary}
          fontSize={24}
          fontWeight="600"
          lineHeight={32}
          letterSpacing={-0.24}
        >
          {user.name}
        </Text>
        <XStack gap="$1" items="center">
          <MapPin size={16} color={colors.mist} />
          <Text color={colors.mist} fontSize={16} lineHeight={24}>
            {userAddress ? userAddress.address : 'Unknown Location'}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  )
}

export default NameAvatar
