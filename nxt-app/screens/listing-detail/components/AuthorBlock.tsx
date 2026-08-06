import { Link } from 'expo-router'
import { Image, Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'
import useUser from '@hooks/useUser'

interface Props {
  postAuthorId: string
}

const AuthorBlock: React.FC<Props> = ({ postAuthorId }) => {
  const colors = useColors()
  const { data: user } = useUser(postAuthorId)
  return (
    <XStack
      p={16}
      bg={colors.surfaceElevated}
      rounded={12}
      borderWidth={1}
      borderColor={colors.border}
      items="center"
      justify="space-between"
      gap="$3"
    >
      <XStack gap="$3" items="center" flex={1}>
        <Image height={40} width={40} borderRadius={20} src={user?.avatar || ''} />
        <YStack>
          <Text color={colors.pearl} fontSize={14} fontWeight="500" lineHeight={20}>
            {user?.name}
          </Text>
          <Text color={colors.amber} fontSize={12} lineHeight={16}>
            ⭐ {user?.rating} ({user?.reviewsCount} reviews)
          </Text>
        </YStack>
      </XStack>
      <Link href={`/users/${user?.id}`} asChild>
        <Text
          color={colors.iconSubtle}
          fontSize={12}
          fontWeight="500"
          lineHeight={16}
          letterSpacing={0.12}
        >
          View Profile
        </Text>
      </Link>
    </XStack>
  )
}

export default AuthorBlock
