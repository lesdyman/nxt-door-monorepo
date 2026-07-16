import { TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { Text } from 'tamagui'

import Header from '@components/Header'
import useColors from '@constants/useColors'

const InfoCenterHeader = () => {
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
        Info Center
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <Text fontSize={16} lineHeight={24} fontWeight="500" color={colors.linkAccent}>
          Mark All Read
        </Text>
      </TouchableOpacity>
    </Header>
  )
}

export default InfoCenterHeader
