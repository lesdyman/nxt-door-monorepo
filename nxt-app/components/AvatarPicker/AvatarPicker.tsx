import { useState } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import { Camera, X } from 'lucide-react-native'
import { Avatar, View } from 'tamagui'

import useColors from '@constants/useColors'
import uploadsService from '@services/uploadsService'

interface Props {
  avatarUrl: string | null
  onAvatarChange: (url: string) => void
  onAvatarRemove?: () => void
}

const AvatarPicker: React.FC<Props> = ({ avatarUrl, onAvatarChange, onAvatarRemove }) => {
  const colors = useColors()
  const [isUploading, setIsUploading] = useState(false)

  const pick = async () => {
    // No allowsEditing here: it forces iOS's legacy UIImagePickerController,
    // which is much slower to open than the modern PHPickerViewController
    // used when editing is off. The avatar renders circular regardless.
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
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
    <View items="center" style={{ alignSelf: 'center' }}>
      <TouchableOpacity onPress={pick} disabled={isUploading}>
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
          {avatarUrl && onAvatarRemove && (
            <TouchableOpacity
              onPress={onAvatarRemove}
              disabled={isUploading}
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              <View
                bg={colors.notificationDot}
                rounded="$10"
                p="$1.5"
                borderWidth={2}
                borderColor={colors.background}
              >
                <X size={14} color={colors.white} strokeWidth={2} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default AvatarPicker
