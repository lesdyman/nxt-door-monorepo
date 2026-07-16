import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Listing } from '@constants/types/Listing'

const usePostsInfinity = (side?: string, limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['posts-infinite', side, limit],
    queryFn: ({ pageParam }) => getPostsPage(side, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < limit ? undefined : allPages.length * limit,
  })
}

const getPostsPage = async (
  side: string | undefined,
  limit: number,
  offset: number
): Promise<Listing[]> => {
  const response = await axios.get('http://localhost:3000/listings', {
    params: { side, limit, offset },
  })
  return response.data.map((listing: Listing) => ({
    ...listing,
    createdAt: new Date(listing.createdAt),
    updatedAt: new Date(listing.updatedAt),
  }))
}

export default usePostsInfinity
