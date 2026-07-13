import { Button, YStack } from 'tamagui'

import BrandButton from '@components/shared/BrandButton'
import { Side } from '@constants/types/Side'
import useColors from '@constants/useColors'

interface Props {
  side: Side
  onClose: () => void
}

const RequestActions: React.FC<Props> = ({ side, onClose }) => {
  const colors = useColors()
  return (
    <YStack gap="$1">
      <BrandButton
        height={48}
        rounded={8}
        color={colors.white}
        fontSize={16}
        fontWeight="600"
        onPress={() => {
          // Handle request submission
          onClose()
        }}
      >
        {side === 'offer' ? 'Send Request' : 'Send Offer'}
      </BrandButton>
      <Button
        bg="transparent"
        height={48}
        rounded={8}
        color={colors.textPrimary}
        fontSize={16}
        fontWeight="600"
        onPress={() => {
          // Handle request cancellation
          onClose()
        }}
      >
        Cancel
      </Button>
    </YStack>
  )
}

export default RequestActions
