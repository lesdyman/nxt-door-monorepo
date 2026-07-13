import { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router'
import { SendHorizontal, X } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import CategorySelect from '@components/new-post/CategorySelect'
import Description from '@components/new-post/Description'
import PhotoPicker from '@components/new-post/PhotoPicker'
import PickupLocation from '@components/new-post/PickupLocation'
import PriceQuantity from '@components/new-post/PriceQuantity'
import TitleInput from '@components/new-post/TitleInput'
import BrandButton from '@components/shared/BrandButton'
import Header from '@components/shared/Header'
import useColors from '@constants/useColors'

import places from '../data/places'
import users from '../data/users'

export default function NewPostModal() {
  const colors = useColors()
  const router = useRouter()
  const [category, setCategory] = useState<string>('')
  const currentUser = users[0]
  const currentPlace = places.find((p) => p.id === currentUser.place_id)
  const [coords, setCoords] = useState({
    latitude: currentPlace?.latitude ?? 0,
    longitude: currentPlace?.longitude ?? 0,
  })

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <Header>
        <Text fontSize={20} fontWeight="600" color={colors.textPrimary}>
          Add New Post
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 16 }}
      >
        <PhotoPicker />

        <TitleInput />
        <CategorySelect category={category} setCategory={setCategory} />
        <Description />
        <PriceQuantity />
        <PickupLocation
          address={currentPlace?.address || 'Unknown'}
          coords={coords}
          boundary={currentPlace?.boundary}
          onCoordsChange={setCoords}
        />
      </ScrollView>

      <YStack px="$4" py="$3" style={{ backgroundColor: colors.background }}>
        <BrandButton size="$4">
          <SendHorizontal size={20} color={colors.white} />
          <Text fontSize={16} lineHeight={24} fontWeight="600" color={colors.white}>
            Add Post
          </Text>
        </BrandButton>
      </YStack>
    </SafeAreaView>
  )
}
