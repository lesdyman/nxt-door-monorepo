import { MapPin } from 'lucide-react-native'
import { Image, Text, View, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'
import usePlace from '@hooks/usePlace'

interface Props {
  user: {
    name: string
    avatar: string
    placeId: string
  }
}

const NameAvatar: React.FC<Props> = ({ user }) => {
  const colors = useColors()
  const { data: place } = usePlace(user.placeId)
  const userAddress = place
  return (
    <YStack gap="$3" items="center">
      {user.avatar ? (
        <View borderWidth={2} borderColor={colors.avatarBorder} rounded={48} p={2}>
          <Image height={96} width={96} borderRadius={48} src={user.avatar} />
        </View>
      ) : (
        <View
          borderWidth={2}
          height={96}
          width={96}
          items="center"
          justify="center"
          borderColor={colors.avatarBorder}
          rounded={48}
          p={2}
        >
          <Text
            color={colors.iconSubtle}
            fontSize={22}
            fontWeight="700"
            lineHeight={28}
            rounded={48}
          >
            DM
          </Text>
        </View>
      )}

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
