import { BadgeInfo, MessageSquareText } from 'lucide-react-native'
import { Text, View, XStack, YStack } from 'tamagui'

import UserAvatar from '@components/UserAvatar'
import { infoMessage } from '@constants/types/InfoMessage'
import useColors from '@constants/useColors'
import useUser from '@hooks/useUser'

import dateFormatter from '../../../utils/dateFormateter'

interface Props {
  message: infoMessage
}

const MessageCard: React.FC<Props> = ({ message }) => {
  const colors = useColors()
  const { data: sender } = useUser(message.type === 'market' ? message.fromId : null)
  const title = message.type === 'info' ? message.title : (sender?.name ?? 'Unknown user')
  const showBadge = message.type === 'info' || message.subtype !== 'review'
  const badgeLabel = message.type === 'info' ? 'Info' : 'Marketplace'

  return (
    <XStack p="$4" gap="$4" width="100%" borderBottomWidth={1} borderBottomColor={colors.border}>
      {message.type === 'info' ? (
        <View
          bg="rgba(56, 149, 233, 0.2)"
          height={48}
          width={48}
          flex={0}
          items="center"
          justify="center"
          rounded={12}
        >
          <BadgeInfo color="#9FCAFF" size={32} />
        </View>
      ) : (
        <UserAvatar name={sender?.name ?? ''} avatarUrl={sender?.avatar} size={48} />
      )}
      <YStack flex={1} gap="$2" minW={0}>
        <XStack justify="space-between" width="100%" items="center">
          <Text color={colors.textPrimary}>{title}</Text>
          <XStack items="center" gap="$2">
            <Text color={colors.textSecondary}>{dateFormatter(message.createdAt)}</Text>
            {!message.isRead && <View width={6} height={6} rounded={999} bg={colors.brand} />}
          </XStack>
        </XStack>
        <Text numberOfLines={2} color={colors.textSecondary}>
          {message.message}
        </Text>
        {showBadge && (
          <XStack
            bg={colors.closeButtonBg}
            self="flex-start"
            px="$2"
            py={2}
            items="center"
            gap="$1"
            rounded={8}
          >
            {message.type !== 'info' && (
              <MessageSquareText height={12} width={12} color={colors.mist} />
            )}
            <Text fontSize={12} color={colors.mist}>
              {badgeLabel}
            </Text>
          </XStack>
        )}
      </YStack>
    </XStack>
  )
}

export default MessageCard
