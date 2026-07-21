import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { Listing } from '@constants/types/Listing'
import listingsService from '@services/listingsService'

const useListingDetails = (id: number): UseQueryResult<Listing> => {
  return useQuery({
    queryKey: ['listingDetails', id],
    queryFn: () => listingsService.getListingById(id),
  })
}

export default useListingDetails
