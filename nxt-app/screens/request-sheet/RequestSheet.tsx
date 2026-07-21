import { useState } from 'react'
import { useColorScheme } from 'react-native'

import { Sheet, Text, TextArea, Theme, YStack } from 'tamagui'

import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'
import usePlace from '@hooks/usePlace'
import useUser from '@hooks/useUser'

import nameReducer from '../../utils/nameReducer'
import ItemWidget from './components/ItemWidget'
import LocationWidget from './components/LocationWidget'
import Quantity from './components/Quantity'
import RequestActions from './components/RequestActions'
import SheetTop from './components/SheetTop'

interface Props {
  listing: Listing
  isOpen: boolean
  onClose: () => void
}

const RequestSheet: React.FC<Props> = ({ listing, isOpen, onClose }) => {
  const colors = useColors()
  const colorScheme = useColorScheme()
  const { data: user } = useUser(listing.userId)
  const { data: place } = usePlace(user?.placeId || null)

  const [coords, setCoords] = useState({
    latitude: listing.location.latitude,
    longitude: listing.location.longitude,
  })

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onClose()}
      snapPoints={[93, 50]}
      modal
      dismissOnSnapToBottom
      dismissOnOverlayPress
    >
      <Sheet.Overlay onPress={onClose} backgroundColor="rgba(0,0,0,0.5)" />
      <Sheet.Handle backgroundColor={colors.border} />
      <Sheet.Frame bg={colors.surfaceElevated} px="$4" pb="$8">
        <Theme name={colorScheme === 'light' ? 'light' : 'dark'}>
          <YStack gap="$3">
            <SheetTop side={listing.side} userName={user?.name || 'Unknown'} />

            <ItemWidget
              widgetData={{
                image: listing.images[0],
                title: listing.title,
                price: listing.price,
                category: listing.category,
              }}
            />

            <Quantity />

            <LocationWidget
              userName={user?.name || 'Unknown'}
              address={listing.location.address}
              coords={coords}
              boundary={place?.boundary}
              onCoordsChange={setCoords}
            />

            <YStack gap="$2">
              <Text color={colors.mist} fontSize={12} lineHeight={16} letterSpacing={0.12}>
                Add a message for {user?.name ? nameReducer(user.name) : 'Unknown'}
              </Text>
              <TextArea
                height={98}
                bg={colors.surface}
                borderWidth={1}
                fontSize={16}
                borderColor={colors.border}
                placeholder="e.g., I can come by at 6 PM today..."
                placeholderTextColor="$gray9"
                focusStyle={{ borderColor: colors.borderFocus }}
                color={colors.textPrimary}
              />
            </YStack>
            <RequestActions side={listing.side} onClose={onClose} />
          </YStack>
        </Theme>
      </Sheet.Frame>
    </Sheet>
  )
}

export default RequestSheet
