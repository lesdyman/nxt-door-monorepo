import { Text, YStack } from 'tamagui'

import Loader from '@components/Loader'
import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'

import NLCard from './NLCard'

const LIST_HEIGHT = 220

interface Props {
  requests: Listing[]
  isLoading: boolean
}

const NeighborsAreLooking: React.FC<Props> = ({ requests, isLoading }) => {
  const colors = useColors()

  return (
    <YStack gap="$3" px="$4">
      <Text color={colors.textPrimary} fontSize={16} fontWeight="500" lineHeight={24}>
        Neighbors are looking for
      </Text>
      {isLoading ? (
        <YStack
          height={LIST_HEIGHT}
          style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          <Loader size={32} colorPrimary={colors.brand} colorSecondary={colors.amber} />
        </YStack>
      ) : (
        <YStack gap="$2">
          {requests.map((request) => (
            <NLCard key={request.id} request={request} />
          ))}
        </YStack>
      )}
    </YStack>
  )
}

export default NeighborsAreLooking
