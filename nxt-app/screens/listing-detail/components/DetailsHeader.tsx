import { TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router'
import { ArrowLeft, Heart } from 'lucide-react-native'
import { Text } from 'tamagui'

import Header from '@components/Header'
import useColors from '@constants/useColors'
import useToggleSavedListing from '@hooks/useToggleSavedListing'

interface Props {
  currentListingId: number
}

const DetailsHeader: React.FC<Props> = ({ currentListingId }) => {
  const colors = useColors()
  const router = useRouter()
  const { isSaved, toggle, requiresAuth, isPending } = useToggleSavedListing(currentListingId)

  const handlePress = () => {
    if (requiresAuth) {
      router.push('/login')
      return
    }
    toggle()
  }

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
      <TouchableOpacity onPress={handlePress} disabled={isPending}>
        <Heart
          size={24}
          color={colors.notificationDot}
          fill={isSaved ? colors.notificationDot : 'transparent'}
        />
      </TouchableOpacity>
    </Header>
  )
}

export default DetailsHeader
