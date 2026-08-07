import { Side } from './Side'

export type ListingStatus = 'active' | 'closed' | 'reserved' | 'disabled'
export type ListingCondition = 'new' | 'like_new' | 'good' | 'fair'

export interface Listing {
  id: number
  title: string
  description: string
  price: number
  currency: string
  images: string[]
  side: Side
  category: string
  condition?: ListingCondition
  status: ListingStatus
  amountAvailable: string
  createdAt: Date
  updatedAt: Date
  userId: string
  location: {
    latitude: number
    longitude: number
    address: string
  }
}
