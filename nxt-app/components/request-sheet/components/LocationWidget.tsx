import { MapPin, UserRound } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import PickupMapField from '@components/shared/PickupMap/PickupMapField'
import useColors from '@constants/useColors'

import nameReducer from '../../../utils/nameReducer'

interface Coords {
  latitude: number
  longitude: number
}

interface Props {
  userName: string
  address: string
  coords: Coords
  boundary?: Coords[]
  onCoordsChange: (coords: Coords) => void
}

const LocationWidget: React.FC<Props> = ({
  userName,
  address,
  coords,
  boundary,
  onCoordsChange,
}) => {
  const colors = useColors()
  return (
    <YStack gap="$3">
      <XStack gap="$3">
        <UserRound height={20} width={20} color={colors.brand} />
        <YStack>
          <Text fontSize={12} lineHeight={16} letterSpacing={0.6} color={colors.mist}>
            SELLER
          </Text>
          <Text color={colors.textPrimary} fontSize={14} lineHeight={20}>
            {nameReducer(userName || 'Unknown')}
          </Text>
        </YStack>
      </XStack>
      <XStack gap="$3" items="center">
        <MapPin height={20} width={20} color={colors.brand} />
        <YStack>
          <Text color={colors.textPrimary} fontSize={12} lineHeight={16} letterSpacing={0.6}>
            PICKUP LOCATION
          </Text>
          <Text color={colors.textPrimary} fontSize={14} lineHeight={20}>
            {address || 'Unknown'}
          </Text>
        </YStack>
      </XStack>
      <PickupMapField coords={coords} boundary={boundary} onCoordsChange={onCoordsChange} />
    </YStack>
  )
}

export default LocationWidget
