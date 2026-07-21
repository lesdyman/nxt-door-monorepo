import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { Listing } from '@constants/types/Listing'
import listingsService from '@services/listingsService'

interface UsePostsParams {
  side?: string
  userId?: number
  limit?: number
}

const usePosts = ({ side, userId, limit = 50 }: UsePostsParams = {}): UseQueryResult<Listing[]> => {
  return useQuery({
    queryKey: ['posts', side, userId, limit],
    queryFn: () => listingsService.getListings({ side, userId, limit }),
  })
}

export default usePosts
