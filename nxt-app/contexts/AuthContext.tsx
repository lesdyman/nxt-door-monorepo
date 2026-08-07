import { authClient } from '@services/authClient'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return children
}

export const useAuth = () => {
  const { data, isPending } = authClient.useSession()

  return {
    userId: data?.user?.id ?? null,
    isPending,
  }
}
