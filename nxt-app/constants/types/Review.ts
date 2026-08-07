export interface Review {
  id: number
  reviewerId: string
  revieweeId: string
  listingId: number
  rating: number
  comment: string
  createdAt: Date
  updatedAt: Date
}
