import User from '@constants/types/User'

export type UserResponse = {
  id: string
  name: string
  avatar: string
  onboarded: boolean
  rating: number
  reviewsCount: number
  dealsCount: number
  placeId: string
  createdAt: string
  updatedAt: string
}

const transformUserData = (data: UserResponse): User => {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}

export default transformUserData
