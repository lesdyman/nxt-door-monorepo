import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { Listing } from '@constants/types/Listing'
import listingsService from '@services/listingsService'

const usePosts = (side?: string, limit: number = 50): UseQueryResult<Listing[]> => {
  return useQuery({
    queryKey: ['posts', side, limit],
    queryFn: () => listingsService.getListings({ side, limit }),
  })
}

export default usePosts
