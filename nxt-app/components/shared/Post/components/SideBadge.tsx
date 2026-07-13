import { Text } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  side: string
}

const SideBadge: React.FC<Props> = ({ side }) => {
  const colors = useColors()
  return (
    <Text
      color={side === 'offer' ? colors.offeringBadgeText : colors.requestBadgeText}
      px="$2"
      py={2}
      rounded={6}
      textAlignVertical="center"
      fontSize={16}
      lineHeight={24}
      style={{
        backgroundColor: side === 'offer' ? colors.offeringBadgeBg : colors.requestBadgeBg,
        maxHeight: 28,
      }}
    >
      {side === 'offer' ? 'Offering' : 'Request'}
    </Text>
  )
}

export default SideBadge
