import { Text, YStack } from 'tamagui'

import Loader from '@components/Loader'
import useColors from '@constants/useColors'
import usePosts from '@hooks/usePosts'

import NLCard from './NLCard'

const LIST_HEIGHT = 220

const NeighborsAreLooking = () => {
  const colors = useColors()
  const requests = usePosts('order', 3)

  return (
    <YStack gap="$3" px="$4">
      <Text color={colors.textPrimary} fontSize={16} fontWeight="500" lineHeight={24}>
        Neighbors are looking for
      </Text>
      {requests.isLoading ? (
        <YStack
          height={LIST_HEIGHT}
          style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          <Loader size={32} colorPrimary={colors.brand} colorSecondary={colors.amber} />
        </YStack>
      ) : (
        <YStack gap="$2">
          {requests.data?.map((request) => (
            <NLCard key={request.id} request={request} />
          ))}
        </YStack>
      )}
    </YStack>
  )
}

export default NeighborsAreLooking
