import axios from 'axios'

import API_URL from '@constants/apiUrl'
import CreateListingPayload from '@constants/types/CreatePostPayload'
import { Listing } from '@constants/types/Listing'
import transformListingData, { ListingResponse } from '@utils/transformListingData'

const BASE_URL = `${API_URL}/listings`

interface GetListingsParams {
  side?: string
  userId?: string
  limit?: number
  offset?: number
}

const listingsService = {
  getListings: async ({ side, userId, limit, offset }: GetListingsParams = {}): Promise<
    Listing[]
  > => {
    const response = await axios.get(BASE_URL, { params: { side, userId, limit, offset } })
    return response.data.map((listing: ListingResponse) => transformListingData(listing))
  },

  getListingById: async (id: number): Promise<Listing> => {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return transformListingData(response.data)
  },

  createListing: async (payload: CreateListingPayload) => {
    const response = await axios.post(BASE_URL, payload)
    return response.data
  },
  updateListing: async (id: number, payload: Partial<CreateListingPayload>) => {
    const response = await axios.patch(`${BASE_URL}/${id}`, payload)
    return response.data
  },
  deleteListing: async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/${id}`)
    return response.data
  },
}

export default listingsService
