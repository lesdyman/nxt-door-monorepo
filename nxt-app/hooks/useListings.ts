import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { Listing } from '@constants/types/Listing'
import listingsService from '@services/listingsService'

interface UseListingsParams {
  side?: string
  userId?: number
  limit?: number
}

const useListings = ({ side, userId, limit = 50 }: UseListingsParams = {}): UseQueryResult<
  Listing[]
> => {
  return useQuery({
    queryKey: ['listings', side, userId, limit],
    queryFn: () => listingsService.getListings({ side, userId, limit }),
  })
}

export default useListings
