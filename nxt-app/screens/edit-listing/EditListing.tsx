import { useState } from 'react'
import { LayoutAnimation, ScrollView, TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router'
import { ArrowLeft, Save, Trash2 } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ColorTokens, Separator, Switch, Text, TextArea, XStack, YStack } from 'tamagui'

import BrandButton from '@components/BrandButton'
import FormInput from '@components/FormInput'
import Header from '@components/Header'
import Loader from '@components/Loader'
import { Listing } from '@constants/types/Listing'
import useColors from '@constants/useColors'
import useConfirmDeleteListing from '@hooks/useConfirmDeleteListing'
import CategorySelect from '@screens/new-post/components/CategorySelect'

import CurrencySelect from './components/CurrencySelect'
import EditListingPhotos from './components/EditListingPhotos'
import useUpdateListing from './hooks/useUpdateListing'

interface Props {
  listing: Listing
}

const EditListing: React.FC<Props> = ({ listing }) => {
  const colors = useColors()
  const router = useRouter()
  const updateListing = useUpdateListing()
  const { confirmDelete, isPending: isDeleting } = useConfirmDeleteListing()

  const [images, setImages] = useState(listing.images)
  const [title, setTitle] = useState(listing.title)
  const [price, setPrice] = useState(String(listing.price))
  const [currency, setCurrency] = useState(listing.currency)
  const [description, setDescription] = useState(listing.description)
  const [category, setCategory] = useState(listing.category)
  const [markAsSold, setMarkAsSold] = useState(listing.status === 'closed')
  const [isDeactivated, setIsDeactivated] = useState(listing.status === 'disabled')

  const toggleMarkAsSold = (value: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setMarkAsSold(value)
  }

  const toggleDeactivated = (value: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsDeactivated(value)
  }

  const handleSaveChanges = async () => {
    await updateListing.mutateAsync({
      id: listing.id,
      payload: {
        title,
        description,
        price: Number(price),
        currency,
        images,
        category,
        status: isDeactivated ? 'disabled' : markAsSold ? 'closed' : 'active',
      },
    })
    router.back()
  }

  const handleDelete = () => confirmDelete(listing.id, () => router.back())

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <Header>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text
          flex={1}
          style={{ textAlign: 'center' }}
          fontSize={17}
          fontWeight="600"
          color={colors.textPrimary}
          numberOfLines={1}
        >
          Edit Listing
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text color={colors.accent} fontSize={15} fontWeight="600">
            Cancel
          </Text>
        </TouchableOpacity>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$5" px="$4" py="$4">
          <EditListingPhotos images={images} onChange={setImages} />

          <YStack gap="$2">
            <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
              Title
            </Text>
            <FormInput value={title} onChangeText={setTitle} fontSize={14} lineHeight={20} />
          </YStack>

          <XStack gap="$3">
            <YStack flex={1} gap="$2">
              <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
                Price
              </Text>
              <FormInput
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                fontSize={14}
                lineHeight={20}
              />
            </YStack>
            <YStack flex={1}>
              <CurrencySelect currency={currency} setCurrency={setCurrency} />
            </YStack>
          </XStack>

          <YStack gap="$2">
            <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
              Description
            </Text>
            <TextArea
              value={description}
              onChangeText={setDescription}
              bg={colors.surface}
              color={colors.textPrimary}
              borderColor={colors.border}
              focusStyle={{ borderColor: colors.borderFocus }}
              fontSize={14}
              lineHeight={20}
              height={100}
              placeholderTextColor={colors.textSecondary as ColorTokens}
            />
          </YStack>

          <CategorySelect category={category} setCategory={setCategory} />

          <YStack rounded={12} overflow="hidden" borderWidth={1} borderColor={colors.border}>
            <XStack
              justify="space-between"
              items="center"
              gap="$3"
              p="$4"
              bg={colors.surfaceElevated}
            >
              <YStack flex={1} gap={2}>
                <Text color={colors.textPrimary} fontSize={15} fontWeight="600">
                  Mark as Sold
                </Text>
                <Text color={colors.textSecondary} fontSize={13}>
                  Listing will no longer be visible
                </Text>
              </YStack>
              <Switch
                checked={markAsSold}
                onCheckedChange={toggleMarkAsSold}
                bg={colors.chipInactiveBg}
                borderColor={colors.borderStrong}
                activeStyle={{ backgroundColor: colors.brand, borderColor: colors.brand }}
              >
                <Switch.Thumb
                  bg={colors.white}
                  borderWidth={1}
                  borderColor={colors.borderStrong}
                  style={{
                    shadowColor: colors.shadow,
                    shadowOpacity: 0.15,
                    shadowRadius: 2,
                    shadowOffset: { width: 0, height: 1 },
                  }}
                />
              </Switch>
            </XStack>
            <Separator borderColor={colors.border} />
            <XStack
              justify="space-between"
              items="center"
              gap="$3"
              p="$4"
              bg={colors.surfaceElevated}
            >
              <YStack flex={1} gap={2}>
                <Text color={colors.textPrimary} fontSize={15} fontWeight="600">
                  Deactivate Listing
                </Text>
                <Text color={colors.textSecondary} fontSize={13}>
                  Temporarily hide from marketplace
                </Text>
              </YStack>
              <Switch
                checked={isDeactivated}
                onCheckedChange={toggleDeactivated}
                bg={colors.chipInactiveBg}
                borderColor={colors.borderStrong}
                activeStyle={{ backgroundColor: colors.brand, borderColor: colors.brand }}
              >
                <Switch.Thumb
                  bg={colors.white}
                  borderWidth={1}
                  borderColor={colors.borderStrong}
                  style={{
                    shadowColor: colors.shadow,
                    shadowOpacity: 0.15,
                    shadowRadius: 2,
                    shadowOffset: { width: 0, height: 1 },
                  }}
                />
              </Switch>
            </XStack>
          </YStack>

          <Button
            bg="transparent"
            borderWidth={1}
            borderColor={colors.notificationDot}
            pressStyle={{ bg: 'rgba(229, 72, 77, 0.15)', borderColor: colors.notificationDot }}
            focusStyle={{ bg: 'rgba(229, 72, 77, 0.15)', borderColor: colors.notificationDot }}
            disabled={isDeleting}
            onPress={handleDelete}
          >
            <XStack items="center" gap="$2">
              <Trash2 size={16} color={colors.notificationDot} />
              <Text color={colors.notificationDot} fontSize={14} fontWeight="600">
                Delete Permanently
              </Text>
            </XStack>
          </Button>
        </YStack>
      </ScrollView>

      <YStack
        px="$4"
        pb="$8"
        pt="$3"
        borderTopWidth={1}
        borderColor={colors.border}
        bg={colors.background}
      >
        <BrandButton onPress={handleSaveChanges} disabled={updateListing.isPending}>
          {updateListing.isPending ? (
            <YStack style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Loader size={28} colorPrimary={colors.white} colorSecondary={colors.amber} />
            </YStack>
          ) : (
            <XStack items="center" gap="$2">
              <Save size={18} color={colors.white} />
              <Text color={colors.white} fontSize={16} fontWeight="600">
                Save Changes
              </Text>
            </XStack>
          )}
        </BrandButton>
      </YStack>
    </SafeAreaView>
  )
}

export default EditListing
