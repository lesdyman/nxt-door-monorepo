import axios from 'axios'

import API_URL from '@constants/apiUrl'
import User from '@constants/types/User'
import transformUserData, { UserResponse } from '@utils/transformUserData'

const BASE_URL = `${API_URL}/users`

interface UpdateUserPayload {
  name?: string
  avatar?: string
  placeId?: string
}

const userService = {
  getUser: async (userId: number): Promise<User> => {
    const response = await axios.get<UserResponse>(`${BASE_URL}/${userId}`)
    return transformUserData(response.data)
  },
  updateUser: async (userId: number, payload: UpdateUserPayload): Promise<User> => {
    const response = await axios.patch<UserResponse>(`${BASE_URL}/${userId}`, payload)
    return transformUserData(response.data)
  },
  deleteUser: async (userId: number) => {
    const response = await axios.delete(`${BASE_URL}/${userId}`)
    return response.data
  },
}

export default userService
