import { useMutation, useQueryClient } from '@tanstack/react-query'

import listingsService from '@services/listingsService'

const useCreateListing = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: listingsService.createListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts-infinite'] })
    },
  })
}

export default useCreateListing
