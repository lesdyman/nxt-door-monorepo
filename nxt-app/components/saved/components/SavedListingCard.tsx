import { TouchableOpacity } from 'react-native'

import { ChevronRight, Heart, PackageOpen } from 'lucide-react-native'
import { Image, Text, View, XStack, YStack } from 'tamagui'

import { Listing, ListingStatus } from '@constants/types/Listing'
import useColors from '@constants/useColors'

import users from '../../../data/users'
import nameReducer from '../../../utils/nameReducer'

interface Props {
  listing: Listing
  onPress?: () => void
}

const STATUS_LABEL: Record<ListingStatus, string> = {
  active: 'Active',
  reserved: 'Reserved',
  closed: 'Sold Out',
}

const SavedListingCard: React.FC<Props> = ({ listing, onPress }) => {
  const colors = useColors()
  const statusColorsByStatus: Record<ListingStatus, { bg: string; text: string }> = {
    active: { bg: colors.offeringBadgeBg, text: colors.offeringBadgeText },
    reserved: { bg: 'rgba(255, 178, 36, 0.15)', text: colors.amber },
    closed: { bg: 'rgba(229, 72, 77, 0.15)', text: colors.notificationDot },
  }
  const author = users.find((user) => user.id === listing.userId)
  const statusColors = statusColorsByStatus[listing.status]

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <XStack
        items="center"
        gap="$3"
        py="$3"
        borderBottomWidth={1}
        borderBottomColor={colors.border}
      >
        <View height={64} width={64} rounded={10} overflow="hidden" position="relative">
          {listing.images.length > 0 ? (
            <Image height={64} width={64} src={listing.images[0]} />
          ) : (
            <YStack height={64} width={64} items="center" justify="center" bg={colors.surface}>
              <PackageOpen color={colors.textSecondary} size={24} />
            </YStack>
          )}
          <XStack
            position="absolute"
            t={4}
            l={4}
            px={4}
            py={1}
            rounded={4}
            style={{ backgroundColor: statusColors.bg }}
          >
            <Text
              fontSize={9}
              fontWeight="700"
              letterSpacing={0.3}
              textTransform="uppercase"
              style={{ color: statusColors.text }}
            >
              {STATUS_LABEL[listing.status]}
            </Text>
          </XStack>
        </View>

        <YStack flex={1} gap={2}>
          <Text color={colors.textPrimary} fontSize={15} fontWeight="600" numberOfLines={1}>
            {listing.title}
          </Text>
          <XStack items="center" gap="$1">
            <Text color={colors.brand} fontSize={14} fontWeight="600">
              {listing.price === 0 ? 'Free' : `${listing.price} ${listing.currency}`}
            </Text>
            <Text color={colors.textSecondary} fontSize={14}>
              ·
            </Text>
            <Text color={colors.textSecondary} fontSize={14} numberOfLines={1}>
              {author ? nameReducer(author.name) : 'Unknown user'}
            </Text>
          </XStack>
        </YStack>

        <Heart size={20} color={colors.notificationDot} fill={colors.notificationDot} />
        <ChevronRight size={18} color={colors.textSecondary} />
      </XStack>
    </TouchableOpacity>
  )
}

export default SavedListingCard
