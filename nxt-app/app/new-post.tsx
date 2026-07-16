import { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import axios from 'axios'
import { useRouter } from 'expo-router'
import { SendHorizontal, X } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import Header from '@components/Header'
import { Side } from '@constants/types/Side'
import useColors from '@constants/useColors'
import CategorySelect from '@screens/new-post/components/CategorySelect'
import Description from '@screens/new-post/components/Description'
import PhotoPicker from '@screens/new-post/components/PhotoPicker'
import PickupLocation from '@screens/new-post/components/PickupLocation'
import PriceQuantity from '@screens/new-post/components/PriceQuantity'
import SideSelect from '@screens/new-post/components/SideSelect'
import TitleInput from '@screens/new-post/components/TitleInput'

import places from '../data/places'
import users from '../data/users'

export default function NewPostModal() {
  const colors = useColors()
  const router = useRouter()

  const [side, setSide] = useState<Side>('offer')
  const [category, setCategory] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [photos, setPhotos] = useState<string[]>([])

  const currentUser = users[0]
  const currentPlace = places.find((p) => p.id === currentUser.place_id)

  const [coords, setCoords] = useState({
    latitude: currentPlace?.latitude ?? 0,
    longitude: currentPlace?.longitude ?? 0,
  })

  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = []
    for (const uri of photos) {
      const formData = new FormData()
      formData.append('file', { uri, name: 'photo.jpg', type: 'image/jpeg' } as unknown as Blob)
      const res = await axios.post('http://localhost:3000/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      urls.push(res.data.url)
    }
    return urls
  }

  const handleAddPost = async () => {
    const images = await uploadImages()

    const payload = {
      title,
      description,
      price: Number(price),
      currency: 'UAH',
      images,
      side,
      category,
      userId: currentUser.id,
      latitude: coords.latitude,
      longitude: coords.longitude,
      address: currentPlace?.address ?? '',
    }
    await axios.post('http://localhost:3000/listings', payload)
    router.back()
  }

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
        <PhotoPicker photos={photos} setPhotos={setPhotos} />

        <SideSelect side={side} setSide={setSide} />
        <TitleInput value={title} onChangeText={setTitle} />
        <CategorySelect category={category} setCategory={setCategory} />
        <Description value={description} onChangeText={setDescription} />
        <PriceQuantity priceValue={price} onPriceChange={setPrice} />
        <PickupLocation
          address={currentPlace?.address || 'Unknown'}
          coords={coords}
          boundary={currentPlace?.boundary}
          onCoordsChange={setCoords}
        />
      </ScrollView>

      <YStack px="$4" py="$3" style={{ backgroundColor: colors.background }}>
        <BrandButton size="$4" onPress={handleAddPost}>
          <SendHorizontal size={20} color={colors.white} />
          <Text fontSize={16} lineHeight={24} fontWeight="600" color={colors.white}>
            Add Post
          </Text>
        </BrandButton>
      </YStack>
    </SafeAreaView>
  )
}
