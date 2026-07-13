import { useState } from 'react'

import { MessageSquare } from 'lucide-react-native'
import { Button, Text, XStack } from 'tamagui'

import BrandButton from '@components/shared/BrandButton'
import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'

import RequestSheet from '../../request-sheet/RequestSheet'

interface Props {
  listing: Listing
}

const Actions: React.FC<Props> = ({ listing }) => {
  const colors = useColors()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      <XStack
        px="$4"
        py="$3"
        gap="$3"
        justify="space-between"
        borderTopWidth={1}
        borderTopColor={colors.border}
        style={{ backgroundColor: colors.background }}
      >
        <Button
          border={colors.border}
          borderWidth={1}
          rounded={10}
          height={48}
          flex={0.6}
          color={colors.pearl}
          bg="transparent"
          icon={<MessageSquare />}
        >
          <Text fontSize={14} fontWeight="500" color={colors.pearl}>
            Write in Chat
          </Text>
        </Button>
        <BrandButton
          disabled={listing.status !== 'active'}
          flex={1}
          height={48}
          rounded={10}
          style={{
            opacity: listing.status !== 'active' ? 0.5 : 1,
          }}
          onPress={() => setSheetOpen(true)}
        >
          <Text fontSize={14} fontWeight="500" color={colors.white}>
            {listing.side === 'offer' ? '🤝 I Want This!' : '📦 Offer'}
          </Text>
        </BrandButton>
      </XStack>

      <RequestSheet listing={listing} isOpen={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  )
}

export default Actions
