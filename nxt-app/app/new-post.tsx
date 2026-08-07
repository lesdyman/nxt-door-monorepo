import { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router'
import { SendHorizontal, X } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import Header from '@components/Header'
import Loader from '@components/Loader'
import { Side } from '@constants/types/Side'
import useColors from '@constants/useColors'
import useCurrentUser from '@hooks/useCurrentUser'
import CategorySelect from '@screens/new-post/components/CategorySelect'
import Description from '@screens/new-post/components/Description'
import PhotoPicker from '@screens/new-post/components/PhotoPicker'
import PickupLocation from '@screens/new-post/components/PickupLocation'
import PriceQuantity from '@screens/new-post/components/PriceQuantity'
import SideSelect from '@screens/new-post/components/SideSelect'
import TitleInput from '@screens/new-post/components/TitleInput'
import useCreateListing from '@screens/new-post/hooks/useCreateListing'
import uploadsService from '@services/uploadsService'

export default function NewPostModal() {
  const colors = useColors()
  const router = useRouter()
  const createListing = useCreateListing()

  const [side, setSide] = useState<Side>('offer')
  const [category, setCategory] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [photos, setPhotos] = useState<string[]>([])

  const { user, place } = useCurrentUser()

  const [coords, setCoords] = useState({
    latitude: place?.latitude ?? 0,
    longitude: place?.longitude ?? 0,
  })

  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = []
    for (const uri of photos) {
      urls.push(await uploadsService.uploadImage(uri))
    }
    return urls
  }

  const handleAddPost = async () => {
    if (!user) return

    const images = await uploadImages()

    const payload = {
      title,
      description,
      price: Number(price),
      currency: 'UAH',
      images,
      side,
      category,
      latitude: coords.latitude,
      longitude: coords.longitude,
      address: place?.address ?? '',
    }
    await createListing.mutateAsync(payload)
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
          address={place?.address || 'Unknown'}
          coords={coords}
          boundary={place?.boundary}
          onCoordsChange={setCoords}
        />
      </ScrollView>

      <YStack px="$4" py="$3" style={{ backgroundColor: colors.background }}>
        <BrandButton size="$4" onPress={handleAddPost} disabled={createListing.isPending || !user}>
          {createListing.isPending ? (
            <YStack items="center" justify="center" style={{ width: '100%' }}>
              <Loader size={28} colorPrimary={colors.white} colorSecondary={colors.amber} />
            </YStack>
          ) : (
            <>
              <SendHorizontal size={20} color={colors.white} />
              <Text fontSize={16} lineHeight={24} fontWeight="600" color={colors.white}>
                Add Post
              </Text>
            </>
          )}
        </BrandButton>
      </YStack>
    </SafeAreaView>
  )
}
