import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'

import { Listing } from '@constants/types/Listing'

const usePosts = (side?: string, limit: number = 50): UseQueryResult<Listing[]> => {
  return useQuery({
    queryKey: ['posts', side, limit],
    queryFn: () => getPosts(side, limit),
  })
}

const getPosts = async (side?: string, limit: number = 50): Promise<Listing[]> => {
  const response = await axios.get('http://localhost:3000/listings', {
    params: { side, limit },
  })
  return response.data.map((listing: Listing) => ({
    ...listing,
    createdAt: new Date(listing.createdAt),
    updatedAt: new Date(listing.updatedAt),
  }))
}

export default usePosts
