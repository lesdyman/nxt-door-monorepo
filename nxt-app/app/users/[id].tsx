import { Stack, useLocalSearchParams } from 'expo-router'

import useUser from '@hooks/useUser'
import AuthorDetails from '@screens/author-details/AuthorDetails'

export default function AuthorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: user } = useUser(id ? Number(id) : null)

  if (!user) return null

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AuthorDetails user={user} />
    </>
  )
}
