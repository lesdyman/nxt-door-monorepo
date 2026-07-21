import { useMutation, useQueryClient } from '@tanstack/react-query'

import listingsService from '@services/listingsService'

const useDeleteListing = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => listingsService.deleteListing(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] })
      queryClient.invalidateQueries({ queryKey: ['listings-infinite'] })
      queryClient.removeQueries({ queryKey: ['listingDetails', id] })
    },
  })
}

export default useDeleteListing
