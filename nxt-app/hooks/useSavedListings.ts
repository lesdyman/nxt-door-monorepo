import { useQuery } from '@tanstack/react-query'

import SavedListing from '@constants/types/SavedListing'
import savedListingsService from '@services/savedListingsService'

const useSavedListings = (userId?: number) => {
  return useQuery<SavedListing[]>({
    queryKey: ['savedListings', userId],
    queryFn: () => savedListingsService.getAllSavedListingsForUser(userId),
    enabled: !!userId,
  })
}

export default useSavedListings
