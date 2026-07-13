import { Image, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import { ImagePlus, X } from 'lucide-react-native'
import { Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  uri?: string
  onChange: (uri: string | undefined) => void
}

const ScreenshotUpload: React.FC<Props> = ({ uri, onChange }) => {
  const colors = useColors()
  const pick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 0.8,
    })

    if (!result.canceled) {
      onChange(result.assets[0].uri)
    }
  }

  return (
    <YStack gap="$2">
      <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
        Upload Screenshot
      </Text>
      {uri ? (
        <YStack width={140} height={140} style={{ position: 'relative' }}>
          <Image source={{ uri }} style={{ width: 140, height: 140, borderRadius: 12 }} />
          <TouchableOpacity
            onPress={() => onChange(undefined)}
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 999,
              padding: 4,
            }}
          >
            <X size={14} color={colors.white} />
          </TouchableOpacity>
        </YStack>
      ) : (
        <TouchableOpacity onPress={pick}>
          <YStack
            width={140}
            height={140}
            items="center"
            justify="center"
            gap="$2"
            rounded={12}
            borderWidth={1}
            borderColor={colors.borderStrong}
            style={{ backgroundColor: colors.tabBarBg, borderStyle: 'dashed' }}
          >
            <ImagePlus size={28} color={colors.textSecondary} strokeWidth={1.2} />
            <Text
              fontSize={13}
              lineHeight={18}
              color={colors.textSecondary}
              text="center"
              width={100}
            >
              Tap to upload screenshot
            </Text>
          </YStack>
        </TouchableOpacity>
      )}
    </YStack>
  )
}

export default ScreenshotUpload
