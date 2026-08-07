import { useQuery, UseQueryResult } from '@tanstack/react-query'

import User from '@constants/types/User'
import userService from '@services/userService'

const useUser = (id: string | null): UseQueryResult<User> => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUser(id!),
    enabled: !!id,
  })
}

export default useUser
