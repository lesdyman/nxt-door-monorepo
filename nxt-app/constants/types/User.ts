type User = {
  id: string
  name: string
  avatar: string | null
  onboarded: boolean
  rating: number
  reviewsCount: number
  placeId: string
  dealsCount: number
  createdAt: Date
  updatedAt: Date
}

export default User
