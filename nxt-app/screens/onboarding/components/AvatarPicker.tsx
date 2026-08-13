import { useState } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'lucide-react-native'
import { Avatar, View } from 'tamagui'

import useColors from '@constants/useColors'
import uploadsService from '@services/uploadsService'

interface Props {
  avatarUrl: string | null
  onAvatarChange: (url: string) => void
}

const AvatarPicker: React.FC<Props> = ({ avatarUrl, onAvatarChange }) => {
  const colors = useColors()
  const [isUploading, setIsUploading] = useState(false)

  const pick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (result.canceled) return

    setIsUploading(true)
    try {
      const url = await uploadsService.uploadImage(result.assets[0].uri)
      onAvatarChange(url)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <TouchableOpacity onPress={pick} disabled={isUploading} style={{ alignSelf: 'center' }}>
      <View position="relative">
        <Avatar circular size="$11" borderWidth={1} borderColor={colors.border}>
          {avatarUrl && <Avatar.Image src={avatarUrl} />}
          <Avatar.Fallback items="center" justify="center" bg={colors.surface}>
            {isUploading ? (
              <ActivityIndicator color={colors.textSecondary} />
            ) : (
              <Camera size={28} color={colors.textSecondary} strokeWidth={1.5} />
            )}
          </Avatar.Fallback>
        </Avatar>
        <View
          position="absolute"
          b="$0"
          r="$0"
          bg={colors.brand}
          rounded="$10"
          p="$1.5"
          borderWidth={2}
          borderColor={colors.background}
        >
          <Camera size={14} color={colors.white} strokeWidth={2} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default AvatarPicker
