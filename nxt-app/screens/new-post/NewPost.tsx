import { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { SendHorizontal, X } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, YStack } from 'tamagui'
import { z } from 'zod'

import BrandButton from '@components/BrandButton'
import Header from '@components/Header'
import Loader from '@components/Loader'
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

const newPostSchema = z.object({
  side: z.enum(['offer', 'order']),
  category: z.string().min(1, 'Please select a category'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, 'Enter a valid price'),
  photos: z.array(z.string()),
})

export default function NewPostModal() {
  const colors = useColors()
  const router = useRouter()
  const createListing = useCreateListing()

  const { user, place } = useCurrentUser()

  const [coords, setCoords] = useState({
    latitude: place?.latitude ?? 0,
    longitude: place?.longitude ?? 0,
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      side: 'offer' as const,
      category: '',
      title: '',
      description: '',
      price: '',
      photos: [] as string[],
    },
  })

  const uploadImages = async (photos: string[]): Promise<string[]> => {
    const urls: string[] = []
    for (const uri of photos) {
      urls.push(await uploadsService.uploadImage(uri))
    }
    return urls
  }

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return

    const images = await uploadImages(data.photos)

    const payload = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      currency: 'UAH',
      images,
      side: data.side,
      category: data.category,
      latitude: coords.latitude,
      longitude: coords.longitude,
      address: place?.address ?? '',
    }
    await createListing.mutateAsync(payload)
    router.back()
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
        <Controller
          control={control}
          name="photos"
          render={({ field: { value, onChange } }) => (
            <PhotoPicker photos={value} setPhotos={onChange} />
          )}
        />

        <Controller
          control={control}
          name="side"
          render={({ field: { value, onChange } }) => (
            <SideSelect side={value} setSide={onChange} />
          )}
        />

        <YStack gap="$2">
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <TitleInput value={value} onChangeText={onChange} />
            )}
          />
          {errors.title && (
            <Text fontSize={12} color={colors.notificationDot}>
              {errors.title.message}
            </Text>
          )}
        </YStack>

        <YStack gap="$2">
          <Controller
            control={control}
            name="category"
            render={({ field: { value, onChange } }) => (
              <CategorySelect category={value} setCategory={onChange} />
            )}
          />
          {errors.category && (
            <Text fontSize={12} color={colors.notificationDot}>
              {errors.category.message}
            </Text>
          )}
        </YStack>

        <YStack gap="$2">
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Description value={value} onChangeText={onChange} />
            )}
          />
          {errors.description && (
            <Text fontSize={12} color={colors.notificationDot}>
              {errors.description.message}
            </Text>
          )}
        </YStack>

        <YStack gap="$2">
          <Controller
            control={control}
            name="price"
            render={({ field: { value, onChange } }) => (
              <PriceQuantity priceValue={value} onPriceChange={onChange} />
            )}
          />
          {errors.price && (
            <Text fontSize={12} color={colors.notificationDot}>
              {errors.price.message}
            </Text>
          )}
        </YStack>

        <PickupLocation
          address={place?.address || 'Unknown'}
          coords={coords}
          boundary={place?.boundary}
          onCoordsChange={setCoords}
        />
      </ScrollView>

      <YStack px="$4" py="$3" style={{ backgroundColor: colors.background }}>
        <BrandButton
          size="$4"
          onPress={onSubmit}
          disabled={isSubmitting || !user}
          opacity={isSubmitting || !user ? 0.6 : 1}
        >
          {isSubmitting ? (
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
