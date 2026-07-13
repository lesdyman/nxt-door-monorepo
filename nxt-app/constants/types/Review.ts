export interface Review {
  id: number
  reviewerId: number
  revieweeId: number
  listingId: number
  rating: number
  comment: string
  createdAt: Date
  updatedAt: Date
}
