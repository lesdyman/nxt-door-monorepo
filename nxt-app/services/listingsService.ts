import axios from 'axios'

import { Listing } from '@constants/types/Listing'
import { Side } from '@constants/types/Side'
import transformListingData, { ListingResponse } from '@utils/transformListingData'

const BASE_URL = 'http://localhost:3000/listings'

interface GetListingsParams {
  side?: string
  limit?: number
  offset?: number
}

interface CreateListingPayload {
  title: string
  description: string
  price: number
  currency: string
  images: string[]
  side: Side
  category: string
  userId: number
  latitude: number
  longitude: number
  address: string
}

const listingsService = {
  getListings: async ({ side, limit, offset }: GetListingsParams = {}): Promise<Listing[]> => {
    const response = await axios.get(BASE_URL, { params: { side, limit, offset } })
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
}

export default listingsService
