import axios from 'axios'

import API_URL from '@constants/apiUrl'
import SavedListing from '@constants/types/SavedListing'
import transformListingData, { ListingResponse } from '@utils/transformListingData'

type SavedListingResponse = {
  id: number
  userId: number
  listingId: number
  listing?: ListingResponse
}

const savedListingsService = {
  getAllSavedListingsForUser: async (userId?: number): Promise<SavedListing[]> => {
    const response = await axios.get(`${API_URL}/saved-listings`, {
      params: { userId },
    })
    return response.data.map((savedListing: SavedListingResponse) => ({
      id: savedListing.id,
      userId: savedListing.userId,
      listingId: savedListing.listingId,
      listing: savedListing.listing ? transformListingData(savedListing.listing) : undefined,
    }))
  },

  addListingToSaved: async (listingId: number, userId: number) => {
    const response = await axios.post(`${API_URL}/saved-listings`, {
      listingId,
      userId,
    })
    return response.data
  },

  removeListingFromSaved: async (savedListingId: number, userId: number) => {
    const response = await axios.delete(`${API_URL}/saved-listings/${savedListingId}`, {
      params: { userId },
    })
    return response.data
  },
}

export default savedListingsService
