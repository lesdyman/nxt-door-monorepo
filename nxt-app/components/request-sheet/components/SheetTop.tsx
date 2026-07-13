import { Text, YStack } from 'tamagui'

import { Side } from '@constants/types/Side'
import useColors from '@constants/useColors'

import nameReducer from '../../../utils/nameReducer'

interface Props {
  side: Side
  userName: string
}

const SheetTop: React.FC<Props> = ({ side, userName }) => {
  const colors = useColors()
  return (
    <YStack pt="$4">
      <Text
        width="100%"
        style={{ textAlign: 'center' }}
        fontSize={18}
        fontWeight="600"
        lineHeight={20}
        color={colors.textPrimary}
      >
        {side === 'offer' ? 'Confirm Request' : 'Confirm Offer'}
      </Text>
      <Text
        style={{ textAlign: 'center' }}
        fontSize={11}
        lineHeight={20}
        color={colors.textSecondary}
      >
        You are requesting to buy from {nameReducer(userName || 'Unknown')}
      </Text>
    </YStack>
  )
}

export default SheetTop
