import { useRef, useState } from 'react'
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import { ImageOff, Pencil, Trash2 } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const PHOTO_HEIGHT = 220

interface Props {
  images: string[]
  onChange: (images: string[]) => void
}

const EditListingPhotos: React.FC<Props> = ({ images, onChange }) => {
  const colors = useColors()
  const [activeIndex, setActiveIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const scrollRef = useRef<ScrollView>(null)

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!containerWidth) return
    const index = Math.round(e.nativeEvent.contentOffset.x / containerWidth)
    setActiveIndex(index)
  }

  const replaceCurrent = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 0.8,
    })

    if (!result.canceled) {
      const updated = [...images]
      updated[activeIndex] = result.assets[0].uri
      onChange(updated)
    }
  }

  const deleteCurrent = () => {
    if (images.length === 0) return
    const updated = images.filter((_, index) => index !== activeIndex)
    onChange(updated)
    setActiveIndex((prev) => Math.max(0, Math.min(prev, updated.length - 1)))
  }

  return (
    <YStack gap="$2">
      <XStack justify="space-between" items="center">
        <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
          Listing Photos
        </Text>
        {images.length > 0 && (
          <Text color={colors.textSecondary} fontSize={13}>
            {activeIndex + 1} of {images.length}
          </Text>
        )}
      </XStack>

      <View
        style={{
          height: PHOTO_HEIGHT,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: colors.surface,
        }}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        {images.length > 0 && containerWidth > 0 ? (
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            scrollEventThrottle={16}
          >
            {images.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={{ width: containerWidth, height: PHOTO_HEIGHT }}
              />
            ))}
          </ScrollView>
        ) : (
          <YStack flex={1} items="center" justify="center">
            <ImageOff color={colors.textSecondary} size={40} />
          </YStack>
        )}

        <XStack style={{ position: 'absolute', top: 10, right: 10, gap: 8 }}>
          <TouchableOpacity
            onPress={replaceCurrent}
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 8,
              padding: 8,
            }}
          >
            <Pencil size={16} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deleteCurrent}
            disabled={images.length === 0}
            style={{
              backgroundColor: colors.notificationDot,
              borderRadius: 8,
              padding: 8,
              opacity: images.length === 0 ? 0.5 : 1,
            }}
          >
            <Trash2 size={16} color={colors.white} />
          </TouchableOpacity>
        </XStack>
      </View>
    </YStack>
  )
}

export default EditListingPhotos
