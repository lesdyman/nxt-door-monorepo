import API_URL from '@constants/apiUrl'
import SavedListing from '@constants/types/SavedListing'
import transformListingData, { ListingResponse } from '@utils/transformListingData'

import apiClient from './apiClient'

type SavedListingResponse = {
  id: number
  userId: string
  listingId: number
  listing?: ListingResponse
}

// userId is never sent — the backend always scopes these to the session's
// own user (see nxt-backend/API.md's saved-listings section).
const savedListingsService = {
  getAllSavedListings: async (): Promise<SavedListing[]> => {
    const response = await apiClient.get(`${API_URL}/saved-listings`)
    return response.data.map((savedListing: SavedListingResponse) => ({
      id: savedListing.id,
      userId: savedListing.userId,
      listingId: savedListing.listingId,
      listing: savedListing.listing ? transformListingData(savedListing.listing) : undefined,
    }))
  },

  addListingToSaved: async (listingId: number) => {
    const response = await apiClient.post(`${API_URL}/saved-listings`, {
      listingId,
    })
    return response.data
  },

  removeListingFromSaved: async (savedListingId: number) => {
    const response = await apiClient.delete(`${API_URL}/saved-listings/${savedListingId}`)
    return response.data
  },
}

export default savedListingsService
