import API_URL from '@constants/apiUrl'
import User from '@constants/types/User'
import transformUserData, { UserResponse } from '@utils/transformUserData'

import apiClient from './apiClient'

const BASE_URL = `${API_URL}/users`

interface CreateUserPayload {
  name: string
  avatar?: string
  placeId: string
}

interface UpdateUserPayload {
  name?: string
  avatar?: string
  placeId?: string
}

const userService = {
  createUser: async (payload: CreateUserPayload): Promise<User> => {
    const response = await apiClient.post<UserResponse>(BASE_URL, payload)
    return transformUserData(response.data)
  },
  getUser: async (userId: string): Promise<User> => {
    const response = await apiClient.get<UserResponse>(`${BASE_URL}/${userId}`)
    return transformUserData(response.data)
  },
  updateUser: async (userId: string, payload: UpdateUserPayload): Promise<User> => {
    const response = await apiClient.patch<UserResponse>(`${BASE_URL}/${userId}`, payload)
    return transformUserData(response.data)
  },
  deleteUser: async (userId: string) => {
    const response = await apiClient.delete(`${BASE_URL}/${userId}`)
    return response.data
  },
}

export default userService
