import { Listing, ListingStatus } from '@constants/types/Listing'
import { Side } from '@constants/types/Side'

export type ListingResponse = {
  id: number
  title: string
  description: string
  price: number
  currency: string
  images: string[]
  side: Side
  category: string
  status: ListingStatus
  latitude: number
  longitude: number
  address: string
  createdAt: string
  updatedAt: string
  userId: string
}

const transformListingData = (data: ListingResponse): Listing => {
  return {
    ...data,
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
      address: data.address,
    },
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    // backend doesn't have this field yet
    amountAvailable: '',
  }
}

export default transformListingData
