import { useQuery } from '@tanstack/react-query'

import { authClient } from '@services/authClient'
import userService from '@services/userService'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return children
}

export const useAuth = () => {
  const { data, isPending } = authClient.useSession()
  const userId = data?.user?.id ?? null

  // No domain `User` row exists until onboarding's `POST /users` runs, so a
  // 404 here just means "not onboarded yet" — not an error to surface.
  const { data: user, isPending: isUserPending } = useQuery({
    queryKey: ['currentUser', userId],
    queryFn: () => userService.getUser(userId as string),
    enabled: !!userId,
    retry: false,
  })

  return {
    userId,
    isPending: isPending || (!!userId && isUserPending),
    onboarded: user?.onboarded ?? false,
  }
}
