import { useInfiniteQuery } from '@tanstack/react-query'

import listingsService from '@services/listingsService'

const useListingsInfinity = (side?: string, limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['listings-infinite', side, limit],
    queryFn: ({ pageParam }) => listingsService.getListings({ side, limit, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < limit ? undefined : allPages.length * limit,
  })
}

export default useListingsInfinity
