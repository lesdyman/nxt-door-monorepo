import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { authClient } from '@services/authClient'
import userService from '@services/userService'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return children
}

export const useAuth = () => {
  const { data, isPending } = authClient.useSession()
  const userId = data?.user?.id ?? null

  const {
    data: user,
    isPending: isUserPending,
    error,
  } = useQuery({
    queryKey: ['currentUser', userId],
    queryFn: () => userService.getUser(userId as string),
    enabled: !!userId,
    retry: false,
  })

  const isNotFound = isAxiosError(error) && error.response?.status === 404
  const isUnknownError = !!error && !isNotFound

  return {
    userId,
    isPending: isPending || (!!userId && isUserPending) || isUnknownError,
    onboarded: user?.onboarded ?? false,
  }
}
