import { useRouter } from 'expo-router'
import { Info, ShoppingBag } from 'lucide-react-native'
import { Text, View, XStack, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import GlowIcon from '@components/GlowIcon/GlowIcon'
import useColors from '@constants/useColors'

interface Props {
  placeName: string
}
const NoPostsYet: React.FC<Props> = ({ placeName = 'N/A' }) => {
  const colors = useColors()
  const router = useRouter()
  return (
    <YStack gap="$6" px="$4" mb="$6">
      <GlowIcon icon={ShoppingBag} size={180} />
      <Text fontSize={24} lineHeight={32} text="center" color={colors.textPrimary}>
        Be the first in
        <Text color={colors.linkAccent} fontWeight="600">
          {' '}
          {placeName}
        </Text>{' '}
        complex
      </Text>
      <Text text="center" fontSize={16} lineHeight={24} color={colors.textSecondary}>
        There are no listings in your complex yet. This is a great time to offer your services or
        items to your neighbors!
      </Text>
      <BrandButton onPress={() => router.push('/new-post')}>Create a Post</BrandButton>

      <View
        p="$4"
        bg={colors.tabBarBg}
        borderWidth={1}
        borderColor={colors.borderStrong}
        rounded={12}
      >
        <XStack gap="$3">
          <Info size={20} color={colors.brand} />

          <YStack>
            <Text fontSize={14} fontWeight="600" lineHeight={20} color={colors.textPrimary}>
              Neighbor Tip
            </Text>
            <Text fontSize={12} lineHeight={16} color={colors.mist}>
              Share something useful: from dog walking to home baking. Your community starts with
              you.
            </Text>
          </YStack>
        </XStack>
      </View>
    </YStack>
  )
}

export default NoPostsYet
