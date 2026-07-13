import { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router'
import { ArrowLeft, Send } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ColorTokens, Text, TextArea, XStack, YStack } from 'tamagui'

import BrandButton from '@components/shared/BrandButton'
import Header from '@components/shared/Header'
import useColors from '@constants/useColors'

import IssueCategoryField from './components/IssueCategoryField'
import IssueCategorySheet from './components/IssueCategorySheet'
import ScreenshotUpload from './components/ScreenshotUpload'

const Help = () => {
  const colors = useColors()
  const router = useRouter()

  const [category, setCategory] = useState('App Bug')
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [screenshotUri, setScreenshotUri] = useState<string | undefined>(undefined)

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <Header>
        <XStack items="center" gap="$3">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text color={colors.accent} fontSize={17} fontWeight="700">
            Report an Issue
          </Text>
        </XStack>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$5" px="$4" py="$4">
          <Text color={colors.textSecondary} fontSize={14} lineHeight={20}>
            Describe the problem you encountered. Attaching a screenshot helps us resolve it faster.
          </Text>

          <IssueCategoryField category={category} onPress={() => setIsCategorySheetOpen(true)} />

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
              placeholder="Tell us what happened..."
              placeholderTextColor={colors.textSecondary as ColorTokens}
              fontSize={14}
              lineHeight={20}
              height={120}
            />
          </YStack>

          <ScreenshotUpload uri={screenshotUri} onChange={setScreenshotUri} />
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
        <BrandButton onPress={() => {}}>
          <XStack items="center" gap="$2">
            <Send size={18} color={colors.white} />
            <Text color={colors.white} fontSize={16} fontWeight="600">
              Submit Report
            </Text>
          </XStack>
        </BrandButton>
      </YStack>

      <IssueCategorySheet
        isOpen={isCategorySheetOpen}
        onClose={() => setIsCategorySheetOpen(false)}
        category={category}
        onSelect={setCategory}
      />
    </SafeAreaView>
  )
}

export default Help
