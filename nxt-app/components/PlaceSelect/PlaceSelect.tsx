import { useQuery } from '@tanstack/react-query'
import { Check, ChevronDown } from 'lucide-react-native'
import { Adapt, Select, Sheet } from 'tamagui'

import useColors from '@constants/useColors'
import placesService from '@services/placesService'

interface Props {
  value: string
  onValueChange: (placeId: string) => void
}

const PlaceSelect: React.FC<Props> = ({ value, onValueChange }) => {
  const colors = useColors()

  const { data: places = [] } = useQuery({
    queryKey: ['places'],
    queryFn: placesService.getPlaces,
  })

  return (
    <Select value={value} onValueChange={onValueChange}>
      <Select.Trigger
        width="100%"
        bg={colors.surface}
        borderColor={colors.border}
        iconAfter={<ChevronDown size={16} color={colors.textSecondary} />}
      >
        <Select.Value placeholder="Search residential complex..." color={colors.textPrimary} />
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet modal dismissOnSnapToBottom snapPointsMode="percent" snapPoints={[50]}>
          <Sheet.Frame bg={colors.surfaceElevated}>
            <Sheet.Handle bg={colors.borderStrong} />
            <Sheet.ScrollView showsVerticalScrollIndicator={false}>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            bg="rgba(0, 0, 0, 0.5)"
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.Viewport>
          <Select.Group gap="$2" pt="$5" px="$2">
            {places.map((place, index) => (
              <Select.Item bg={colors.surface} index={index} key={place.id} value={place.id}>
                <Select.ItemText fontSize={16} color={colors.textPrimary} fontWeight="500">
                  {place.name}
                </Select.ItemText>
                <Select.ItemIndicator ml="auto">
                  <Check size={16} color={colors.brand} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  )
}

export default PlaceSelect
