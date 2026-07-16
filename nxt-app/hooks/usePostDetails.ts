import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'

import { Listing } from '@constants/types/Listing'
import transformListingData from '@utils/transformListingData'

const usePostDetails = (id: number): UseQueryResult<Listing> => {
  return useQuery({
    queryKey: ['postDetails', id],
    queryFn: () => getPostDetails(id),
  })
}

const getPostDetails = async (id: number): Promise<Listing> => {
  const response = await axios.get(`http://localhost:3000/listings/${id}`)
  return transformListingData(response.data)
}

export default usePostDetails
