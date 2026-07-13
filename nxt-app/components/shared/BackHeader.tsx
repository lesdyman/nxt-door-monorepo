import { TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { Text, View } from 'tamagui'

import Header from '@components/shared/Header'
import useColors from '@constants/useColors'

interface Props {
  title: string
}

const BackHeader: React.FC<Props> = ({ title }) => {
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
        {title}
      </Text>
      <View width={24} />
    </Header>
  )
}

export default BackHeader
