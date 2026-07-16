import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { MessageSquareText } from 'lucide-react-native'
import { Button, Text, XStack, YStack } from 'tamagui'

import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'

import CATEGORY_EMOJI from '../../utils/categoryEmoji'

interface Props {
  request: Listing
}
const NLCard: React.FC<Props> = ({ request }) => {
  const colors = useColors()
  const router = useRouter()
  const queryClient = useQueryClient()

  const handlePress = () => {
    queryClient.setQueryData(['postDetails', request.id], request)
    router.push(`/listing/${request.id}`)
  }

  return (
    <XStack
      px="$4"
      py="$4"
      items="center"
      gap="$3"
      borderWidth={1}
      borderColor={colors.border}
      rounded="$4"
      style={{ backgroundColor: colors.surfaceElevated }}
      onPress={handlePress}
      pressStyle={{ opacity: 0.85 }}
    >
      <YStack
        width={48}
        height={48}
        rounded={8}
        items="center"
        justify="center"
        style={{ backgroundColor: colors.neighborIconBg }}
      >
        <Text fontSize={22}>{CATEGORY_EMOJI[request.category]}</Text>
      </YStack>

      <YStack flex={1} gap={4}>
        <Text color={colors.textPrimary} fontSize={16} fontWeight="400" lineHeight={24}>
          {request.title}
        </Text>
        <XStack items="center" gap={6}>
          <YStack
            width={6}
            height={6}
            rounded="$radius.12"
            style={{ backgroundColor: colors.brand }}
          />
          <Text color={colors.textSecondary} fontSize={12} lineHeight={16}>
            {request.updatedAt.toLocaleDateString('uk-UA', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </XStack>
      </YStack>

      <Button
        height={40}
        width={40}
        unstyled
        borderWidth={1}
        borderColor={colors.borderStrong}
        rounded="$radius.12"
        items="center"
        justify="center"
        icon={<MessageSquareText width={20} height={20} color={colors.textPrimary} />}
      />
    </XStack>
  )
}

export default NLCard
