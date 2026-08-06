import { ListingStatus } from './Listing'
import { Side } from './Side'

interface CreateListingPayload {
  title: string
  description: string
  price: number
  currency: string
  images: string[]
  side: Side
  category: string
  status?: ListingStatus
  latitude: number
  longitude: number
  address: string
}

export default CreateListingPayload
