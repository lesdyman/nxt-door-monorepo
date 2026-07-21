import { useAuth } from '@contexts/AuthContext'

import usePlace from './usePlace'
import useUser from './useUser'

const useCurrentUser = () => {
  const { userId } = useAuth()
  const { data: user, isLoading: isUserLoading } = useUser(userId)
  const { data: place, isLoading: isPlaceLoading } = usePlace(user?.placeId || null)

  return {
    user,
    place,
    isLoading: isUserLoading || isPlaceLoading,
  }
}

export default useCurrentUser
