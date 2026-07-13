import { Stack, useLocalSearchParams } from 'expo-router'

import AuthorDetails from '@components/author-details/AuthorDetails'

import users from '../../data/users'

export default function AuthorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const user = users.find((u) => u.id === Number(id))

  if (!user) return null

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AuthorDetails user={user} />
    </>
  )
}
