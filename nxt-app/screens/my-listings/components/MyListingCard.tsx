import { PackageOpen, Pencil, Trash2 } from 'lucide-react-native'
import { Button, Image, Text, View, XStack, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'

interface Props {
  listing: Listing
  onEdit?: () => void
  onPromote?: () => void
  onDelete?: () => void
}

const MyListingCard: React.FC<Props> = ({ listing, onEdit, onPromote, onDelete }) => {
  const colors = useColors()
  return (
    <YStack
      rounded={12}
      borderWidth={1}
      borderColor={colors.border}
      overflow="hidden"
      style={{ backgroundColor: colors.surfaceElevated }}
    >
      <View position="relative">
        {listing.images.length > 0 ? (
          <Image height={180} width="100%" src={listing.images[0]} />
        ) : (
          <YStack height={180} width="100%" items="center" justify="center" bg={colors.surface}>
            <PackageOpen color={colors.textSecondary} size={40} />
          </YStack>
        )}
        <XStack
          position="absolute"
          t="$3"
          l="$3"
          bg={colors.offeringBadgeBg}
          px="$2"
          py={2}
          rounded={6}
        >
          <Text
            fontSize={11}
            fontWeight="700"
            letterSpacing={0.5}
            textTransform="uppercase"
            color={colors.offeringBadgeText}
          >
            {listing.status}
          </Text>
        </XStack>
      </View>

      <YStack gap="$3" p="$4">
        <XStack justify="space-between" items="center" gap="$2">
          <Text
            flex={1}
            color={colors.textPrimary}
            fontSize={16}
            fontWeight="600"
            numberOfLines={1}
          >
            {listing.title}
          </Text>
          <Text color={colors.brand} fontSize={16} fontWeight="600">
            {listing.price === 0 ? 'Free' : `${listing.price} ${listing.currency}`}
          </Text>
        </XStack>
        <Text color={colors.textSecondary} fontSize={14} numberOfLines={2}>
          {listing.description}
        </Text>

        <XStack gap="$2" items="center">
          <BrandButton flex={1} height={40} bg={colors.brand} onPress={onEdit}>
            <XStack items="center" gap="$2">
              <Pencil size={16} color={colors.white} />
              <Text color={colors.white} fontSize={14} fontWeight="600">
                Edit
              </Text>
            </XStack>
          </BrandButton>
          <Button
            width={40}
            height={40}
            px={0}
            bg="transparent"
            borderWidth={1}
            borderColor={colors.notificationDot}
            pressStyle={{
              bg: 'rgba(229, 72, 77, 0.15)',
              borderColor: colors.notificationDot,
            }}
            focusStyle={{
              bg: 'rgba(229, 72, 77, 0.15)',
              borderColor: colors.notificationDot,
            }}
            onPress={onDelete}
          >
            <Trash2 size={16} color={colors.notificationDot} />
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}

export default MyListingCard
