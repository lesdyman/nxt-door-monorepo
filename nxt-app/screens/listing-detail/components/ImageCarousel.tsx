import { useRef, useState } from 'react'
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'

import { Image, Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import CATEGORY_EMOJI from '../../../utils/categoryEmoji'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CAROUSEL_HEIGHT = 300

interface Props {
  images: string[]
  category: string
}

const ImageCarousel: React.FC<Props> = ({ images, category }) => {
  const colors = useColors()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<ScrollView>(null)

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH)
    setActiveIndex(index)
  }

  if (images.length === 0) {
    return (
      <YStack
        width={SCREEN_WIDTH}
        height={CAROUSEL_HEIGHT}
        items="center"
        justify="center"
        style={{ backgroundColor: colors.surface }}
      >
        <Text fontSize={80}>{CATEGORY_EMOJI[category] ?? '📦'}</Text>
      </YStack>
    )
  }

  return (
    <View style={{ width: SCREEN_WIDTH, height: CAROUSEL_HEIGHT }}>
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
            src={uri}
            width={SCREEN_WIDTH}
            height={CAROUSEL_HEIGHT}
            objectFit="cover"
          />
        ))}
      </ScrollView>

      {images.length > 1 && (
        <View
          style={{
            position: 'absolute',
            bottom: 14,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {images.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === activeIndex ? 8 : 6,
                height: i === activeIndex ? 8 : 6,
                borderRadius: 4,
                backgroundColor: i === activeIndex ? colors.brand : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default ImageCarousel
