import { useMutation, useQueryClient } from '@tanstack/react-query'

import listingsService from '@services/listingsService'

const useDeleteListing = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => listingsService.deleteListing(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts-infinite'] })
      queryClient.removeQueries({ queryKey: ['postDetails', id] })
    },
  })
}

export default useDeleteListing
