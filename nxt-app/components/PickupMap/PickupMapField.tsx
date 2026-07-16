import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { Check, Pencil, X } from 'lucide-react-native'
import RNModal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import PickupMap from './PickupMap'

interface Coords {
  latitude: number
  longitude: number
}

interface Props {
  coords: Coords
  boundary?: Coords[]
  label?: string
  onCoordsChange: (coords: Coords) => void
}

const PickupMapField: React.FC<Props> = ({
  coords,
  boundary,
  label = 'Change',
  onCoordsChange,
}) => {
  const colors = useColors()
  const insets = useSafeAreaInsets()
  const [isExpanded, setIsExpanded] = useState(false)
  const [draftCoords, setDraftCoords] = useState(coords)

  const openPicker = () => {
    setDraftCoords(coords)
    setIsExpanded(true)
  }

  const confirm = () => {
    onCoordsChange(draftCoords)
    setIsExpanded(false)
  }

  const cancel = () => setIsExpanded(false)

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={openPicker}>
        <PickupMap coords={coords} boundary={boundary} />
        <XStack
          position="absolute"
          t={8}
          r={8}
          items="center"
          gap="$1"
          bg="rgba(15,20,26,0.85)"
          borderWidth={1}
          borderColor={colors.borderStrong}
          rounded={999}
          px="$2"
          py={4}
        >
          <Pencil size={12} color={colors.brand} />
          <Text color={colors.brand} fontSize={12} lineHeight={16}>
            {label}
          </Text>
        </XStack>
      </TouchableOpacity>

      <RNModal
        isVisible={isExpanded}
        onBackButtonPress={cancel}
        style={{ margin: 0 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <YStack flex={1} style={{ backgroundColor: colors.background, paddingTop: insets.top }}>
          <XStack justify="space-between" items="center" px="$4" py="$3">
            <Text fontSize={16} fontWeight="600" color={colors.textPrimary}>
              Drag the pin to set pickup location
            </Text>
            <TouchableOpacity onPress={cancel}>
              <X size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </XStack>

          <YStack flex={1} px="$4">
            <PickupMap
              coords={draftCoords}
              editable
              boundary={boundary}
              fill
              zoomDelta={0.004}
              onLocationChange={setDraftCoords}
            />
          </YStack>

          <YStack px="$4" py="$3" pb={insets.bottom + 12}>
            <TouchableOpacity
              onPress={confirm}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                backgroundColor: colors.brand,
                borderRadius: 12,
                paddingVertical: 14,
              }}
            >
              <Check size={18} color={colors.white} />
              <Text fontSize={16} fontWeight="600" color={colors.white}>
                Confirm Location
              </Text>
            </TouchableOpacity>
          </YStack>
        </YStack>
      </RNModal>
    </>
  )
}

export default PickupMapField
