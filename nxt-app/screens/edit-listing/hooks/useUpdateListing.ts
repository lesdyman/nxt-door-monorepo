import { useMutation, useQueryClient } from '@tanstack/react-query'

import CreateListingPayload from '@constants/types/CreatePostPayload'
import listingsService from '@services/listingsService'

interface UpdateListingParams {
  id: number
  payload: Partial<CreateListingPayload>
}

const useUpdateListing = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: UpdateListingParams) =>
      listingsService.updateListing(id, payload),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] })
      queryClient.invalidateQueries({ queryKey: ['listings-infinite'] })
      queryClient.invalidateQueries({ queryKey: ['listingDetails', id] })
    },
  })
}

export default useUpdateListing
