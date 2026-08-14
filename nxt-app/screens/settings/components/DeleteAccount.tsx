import { useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'

import { useRouter } from 'expo-router'
import { Trash2 } from 'lucide-react-native'
import { Button, Text, XStack } from 'tamagui'

import useColors from '@constants/useColors'
import { useAuth } from '@contexts/AuthContext'
import authService from '@services/authService'
import userService from '@services/userService'

const DeleteAccount = () => {
  const colors = useColors()
  const router = useRouter()
  const { userId } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteAccount = async () => {
    if (!userId) return
    setIsDeleting(true)
    try {
      await userService.deleteUser(userId)
    } catch {
      setIsDeleting(false)
      Alert.alert('Something went wrong', 'Could not delete your account. Please try again later.')
      return
    }

    router.back()
    setTimeout(() => {
      authService.signOut().catch(() => {})
    }, 400)
  }

  const handleDeleteUser = () => {
    Alert.alert(
      'Delete My Account',
      'This will permanently delete your account and all your data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setTimeout(deleteAccount, 400),
        },
      ]
    )
  }

  return (
    <Button
      chromeless
      size="$3"
      color={colors.notificationDot}
      bg="transparent"
      borderWidth={0}
      disabled={isDeleting}
      pressStyle={{ opacity: 0.6, bg: 'transparent', borderWidth: 0 }}
      focusStyle={{ opacity: 0.6, bg: 'transparent', borderWidth: 0 }}
      onPress={handleDeleteUser}
    >
      <XStack items="center" gap="$2">
        {isDeleting ? (
          <ActivityIndicator color={colors.notificationDot} />
        ) : (
          <>
            <Trash2 size={16} color={colors.notificationDot} />
            <Text color={colors.notificationDot} fontSize={14} fontWeight="600">
              Delete My Account
            </Text>
          </>
        )}
      </XStack>
    </Button>
  )
}

export default DeleteAccount
