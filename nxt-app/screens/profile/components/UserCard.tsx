import { Image, Text, View, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  userCardData: {
    name?: string
    avatar?: string
    placeName?: string
    rating?: number
    reviewsCount?: number
  }
}

const UserCard: React.FC<Props> = ({ userCardData }) => {
  const colors = useColors()
  return (
    <YStack
      bg={colors.surfaceElevated}
      height={244}
      items="center"
      justify="center"
      gap="$2"
      borderWidth={1}
      rounded={12}
      borderColor={colors.border}
    >
      {userCardData.avatar === '' || !userCardData.avatar ? (
        <View
          height={96}
          width={96}
          items="center"
          justify="center"
          bg={colors.surfaceElevated}
          rounded={50}
          borderWidth={2}
          borderColor={colors.border}
        >
          <Text fontSize={24} fontWeight={600} color={colors.brand}>
            ND
          </Text>
        </View>
      ) : (
        <Image
          height={96}
          width={96}
          borderRadius={50}
          borderWidth={2}
          borderColor={colors.border}
          src={userCardData.avatar}
        />
      )}

      <Text
        fontSize={24}
        fontWeight={600}
        lineHeight={32}
        color={colors.textPrimary}
        letterSpacing={-0.24}
      >
        {userCardData.name || 'N/A'}
      </Text>
      <Text fontSize={16} lineHeight={24} color={colors.textMuted}>
        {userCardData.placeName || 'N/A'}
      </Text>
      <XStack
        gap="$2"
        items="center"
        bg={colors.surface}
        px="$2"
        py="$2"
        rounded={50}
        borderWidth={1}
        borderColor={colors.border}
      >
        <Text color={colors.textPrimary} fontSize={16} lineHeight={24}>
          ⭐ {userCardData.rating ? `${userCardData.rating} Rating` : ''}
        </Text>
        <Text color={colors.textSecondary} fontSize={16} lineHeight={24}>
          ·
        </Text>
        <Text color={colors.textMuted} fontSize={16} lineHeight={24}>
          {userCardData.reviewsCount ? `${userCardData.reviewsCount} Reviews` : ''}
        </Text>
      </XStack>
    </YStack>
  )
}

export default UserCard
