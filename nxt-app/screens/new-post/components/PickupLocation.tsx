import { Text, YStack } from 'tamagui'

import PickupMapField from '@components/PickupMap/PickupMapField'
import useColors from '@constants/useColors'

interface Coords {
  latitude: number
  longitude: number
}

interface Props {
  address: string
  coords: Coords
  boundary?: Coords[]
  onCoordsChange: (coords: Coords) => void
}

const PickupLocation: React.FC<Props> = ({ address, coords, boundary, onCoordsChange }) => {
  const colors = useColors()
  return (
    <YStack gap="$2">
      <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
        Select Pickup Location
      </Text>
      <Text color={colors.mist} fontSize={12} lineHeight={16}>
        {address}
      </Text>
      <PickupMapField coords={coords} boundary={boundary} onCoordsChange={onCoordsChange} />
    </YStack>
  )
}

export default PickupLocation
