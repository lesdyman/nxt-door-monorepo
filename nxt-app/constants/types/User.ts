type User = {
  id: number
  name: string
  avatar: string
  rating: number
  reviewsCount: number
  userPosts: number[]
  place_id: string
  ordersIds: number[]
  dealsCount: number
  createdAt: Date
  updatedAt: Date
}

export default User
