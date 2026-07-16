import { Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import usePosts from '../../hooks/usePosts'
import NLCard from './NLCard'

const NeighborsAreLooking = () => {
  const colors = useColors()
  const requests = usePosts('order', 3)

  return (
    <YStack gap="$3" px="$4">
      <Text color={colors.textPrimary} fontSize={16} fontWeight="500" lineHeight={24}>
        Neighbors are looking for
      </Text>
      <YStack gap="$2">
        {requests.data?.map((request) => (
          <NLCard key={request.id} request={request} />
        ))}
      </YStack>
    </YStack>
  )
}

export default NeighborsAreLooking
