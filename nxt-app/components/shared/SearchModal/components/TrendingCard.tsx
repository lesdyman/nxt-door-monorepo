import { ImageBackground, TouchableOpacity, View } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  onPress?: () => void
}

const TrendingCard: React.FC<Props> = ({ onPress }) => {
  const colors = useColors()
  return (
    <YStack gap="$3">
      <Text fontSize={20} fontWeight="600" color={colors.textPrimary}>
        Trending Now
      </Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{ borderRadius: 16, overflow: 'hidden' }}
      >
        <ImageBackground
          source={require('@assets/sell_items/cleaning.png')}
          style={{ width: '100%', aspectRatio: 16 / 9 }}
        >
          <LinearGradient
            colors={['transparent', colors.background]}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              padding: 16,
              gap: 4,
            }}
          >
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(72, 30, 0, 0.8)',
                borderRadius: 4,
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}
            >
              <Text fontSize={10} fontWeight="700" color={colors.peach} letterSpacing={0.5}>
                RECOMMENDED
              </Text>
            </View>
            <Text
              fontSize={24}
              fontWeight="700"
              color={colors.textPrimary}
              lineHeight={32}
              letterSpacing={-0.24}
            >
              Home Cleaning Services
            </Text>
            <Text fontSize={14} color="rgba(192, 199, 214, 0.8)" lineHeight={20}>
              Specialized eco-cleaning for residential complexes.
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </YStack>
  )
}

export default TrendingCard
