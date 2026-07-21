import { Listing } from './Listing'

type SavedListing = {
  id: number
  listingId: number
  userId: number
  listing?: Listing
}

export default SavedListing
