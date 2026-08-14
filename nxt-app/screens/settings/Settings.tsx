import { ScrollView } from 'react-native'

import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import BackHeader from '@components/BackHeader'
import useColors from '@constants/useColors'
import { useAuth } from '@contexts/AuthContext'
import { authClient } from '@services/authClient'

import ChangeNameEmailPlace from './components/ChangeNameEmailPlace'
import ChangePassword from './components/ChangePassword'
import DeleteAccount from './components/DeleteAccount'

const Settings = () => {
  const colors = useColors()
  const { userId } = useAuth()

  const { data: accounts } = useQuery({
    queryKey: ['accounts', userId],
    queryFn: async () => {
      const { data, error } = await authClient.listAccounts()
      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
  const hasPassword = accounts?.some((account) => account.providerId === 'credential') ?? false

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader title="Settings" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <YStack flex={1} justify="space-between" p="$4" gap="$6">
          <YStack gap="$6">
            <ChangeNameEmailPlace />
            {hasPassword && <ChangePassword />}
          </YStack>

          <DeleteAccount />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
