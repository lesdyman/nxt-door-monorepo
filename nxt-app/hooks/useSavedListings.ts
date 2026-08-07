import { useQuery } from '@tanstack/react-query'

import SavedListing from '@constants/types/SavedListing'
import savedListingsService from '@services/savedListingsService'

// `userId` isn't sent to the backend (it always scopes to the session's own
// user) — it's only here to key the cache per-user and gate `enabled` so
// this doesn't fetch before a session exists.
const useSavedListings = (userId?: string) => {
  return useQuery<SavedListing[]>({
    queryKey: ['savedListings', userId],
    queryFn: () => savedListingsService.getAllSavedListings(),
    enabled: !!userId,
  })
}

export default useSavedListings
