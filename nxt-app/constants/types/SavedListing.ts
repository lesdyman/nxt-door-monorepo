import { Listing } from './Listing'

type SavedListing = {
  id: number
  listingId: number
  userId: string
  listing?: Listing
}

export default SavedListing
