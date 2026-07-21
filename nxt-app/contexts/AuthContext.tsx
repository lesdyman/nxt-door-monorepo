import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  userId: number | null
  setUserId: (id: number | null) => void
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  setUserId: () => {},
})

// TODO: remove default once real login/signup exists — currently there's no auth flow,
// so the app boots as this seeded test user (see data/users.ts).
const TEMP_DEFAULT_USER_ID = 1004

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(TEMP_DEFAULT_USER_ID)

  return <AuthContext.Provider value={{ userId, setUserId }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
