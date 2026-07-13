import { TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router'
import { ArrowLeft, Heart } from 'lucide-react-native'
import { Text } from 'tamagui'

import Header from '@components/shared/Header'
import useColors from '@constants/useColors'

const DetailsHeader = () => {
  const colors = useColors()
  const router = useRouter()

  return (
    <Header>
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowLeft size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text
        flex={1}
        style={{ textAlign: 'center' }}
        fontSize={17}
        fontWeight="600"
        color={colors.textPrimary}
        numberOfLines={1}
      >
        Details
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <Heart size={24} color={colors.notificationDot} />
      </TouchableOpacity>
    </Header>
  )
}

export default DetailsHeader
