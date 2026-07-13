import { useState } from 'react'
import { Image, ScrollView, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import { CameraIcon, X } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const MAX_PHOTOS = 10

interface Props {
  onChange?: (uris: string[]) => void
}

const PhotoPicker: React.FC<Props> = ({ onChange }) => {
  const colors = useColors()
  const [photos, setPhotos] = useState<string[]>([])

  const pick = async () => {
    if (photos.length >= MAX_PHOTOS) return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: true,
      selectionLimit: MAX_PHOTOS - photos.length,
      quality: 0.8,
    })

    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri)
      const updated = [...photos, ...uris].slice(0, MAX_PHOTOS)
      setPhotos(updated)
      onChange?.(updated)
    }
  }

  const remove = (index: number) => {
    const updated = photos.filter((_, i) => i !== index)
    setPhotos(updated)
    onChange?.(updated)
  }

  return (
    <YStack gap="$2">
      <Text fontSize={14} lineHeight={20} fontWeight="500" color={colors.textPrimary}>
        Photos
      </Text>

      {photos.length === 0 ? (
        <TouchableOpacity onPress={pick}>
          <YStack
            items="center"
            justify="center"
            gap="$2"
            py="$6"
            height={182}
            rounded={12}
            borderWidth={1}
            borderColor={colors.borderStrong}
            style={{ backgroundColor: colors.tabBarBg }}
          >
            <CameraIcon size={34} color={colors.textSecondary} strokeWidth={1.2} />
            <YStack items="center" gap={4}>
              <Text fontSize={14} fontWeight="500" color={colors.textSecondary}>
                Upload neighborhood treasures
              </Text>
              <Text fontSize={12} lineHeight={16} color={colors.borderStrong}>
                Up to {MAX_PHOTOS} photos • Max 5MB each
              </Text>
            </YStack>
          </YStack>
        </TouchableOpacity>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$2">
            {photos.map((uri, index) => (
              <YStack key={uri} style={{ position: 'relative' }}>
                <Image source={{ uri }} style={{ width: 120, height: 120, borderRadius: 8 }} />
                <TouchableOpacity
                  onPress={() => remove(index)}
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 999,
                    padding: 2,
                  }}
                >
                  <X size={12} color={colors.white} />
                </TouchableOpacity>
              </YStack>
            ))}
            {photos.length < MAX_PHOTOS && (
              <TouchableOpacity onPress={pick}>
                <YStack
                  width={120}
                  height={120}
                  rounded={8}
                  borderWidth={1}
                  borderColor={colors.borderStrong}
                  items="center"
                  justify="center"
                  style={{ backgroundColor: colors.surface }}
                >
                  <CameraIcon size={34} color={colors.textMuted} strokeWidth={1} />
                </YStack>
              </TouchableOpacity>
            )}
          </XStack>
        </ScrollView>
      )}
    </YStack>
  )
}

export default PhotoPicker
