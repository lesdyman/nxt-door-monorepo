import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { Listing } from '@constants/types/Listing'
import listingsService from '@services/listingsService'

const usePostDetails = (id: number): UseQueryResult<Listing> => {
  return useQuery({
    queryKey: ['postDetails', id],
    queryFn: () => listingsService.getListingById(id),
  })
}

export default usePostDetails
