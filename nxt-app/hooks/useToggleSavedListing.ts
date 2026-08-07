import { useMutation, useQueryClient } from '@tanstack/react-query'

import savedListingsService from '@services/savedListingsService'

import useCurrentUser from './useCurrentUser'
import useSavedListings from './useSavedListings'

const useToggleSavedListing = (listingId: number) => {
  const { user } = useCurrentUser()
  const queryClient = useQueryClient()
  const { data: savedListings } = useSavedListings(user?.id)

  const savedListing = (savedListings ?? []).find((item) => item.listingId === listingId)
  const isSaved = !!savedListing

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) return
      if (savedListing) {
        await savedListingsService.removeListingFromSaved(savedListing.id)
      } else {
        await savedListingsService.addListingToSaved(listingId)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedListings', user?.id] })
    },
  })

  return {
    isSaved,
    toggle: mutation.mutate,
    isPending: mutation.isPending,
    requiresAuth: !user,
  }
}

export default useToggleSavedListing
