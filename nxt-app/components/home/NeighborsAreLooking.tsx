import { useMemo } from 'react'

import { Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import mockListings from '../../data/mockListings'
import NLCard from './NLCard'

const NeighborsAreLooking = () => {
  const colors = useColors()
  const requests = useMemo(
    () =>
      mockListings
        .filter((item) => item.side === 'order')
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, 3),
    []
  )
  return (
    <YStack gap="$3" px="$4">
      <Text color={colors.textPrimary} fontSize={16} fontWeight="500" lineHeight={24}>
        Neighbors are looking for
      </Text>
      <YStack gap="$2">
        {requests.map((request) => (
          <NLCard key={request.id} request={request} />
        ))}
      </YStack>
    </YStack>
  )
}

export default NeighborsAreLooking
