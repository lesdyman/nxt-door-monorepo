import { Image, Text, XStack, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import CATEGORY_EMOJI from '../../../utils/categoryEmoji'

interface Props {
  widgetData: {
    image: string
    title: string
    price: number
    category: string
  }
}

const ItemWidget: React.FC<Props> = ({ widgetData }) => {
  const colors = useColors()
  const { image, title, price, category } = widgetData
  return (
    <YStack gap="$5">
      <XStack
        bg={colors.surface}
        p="$4"
        rounded="$4"
        borderWidth={1}
        borderColor={colors.border}
        gap="$4"
      >
        {image ? (
          <Image borderRadius={8} height={64} width={64} src={image} />
        ) : (
          <YStack
            width={64}
            height={64}
            rounded={8}
            items="center"
            justify="center"
            style={{ backgroundColor: colors.neighborIconBg }}
          >
            <Text fontSize={28}>{CATEGORY_EMOJI[category] ?? '📦'}</Text>
          </YStack>
        )}
        <YStack>
          <Text fontSize={14} lineHeight={20} fontWeight="500" color={colors.textPrimary}>
            {title}
          </Text>
          <Text fontSize={20} lineHeight={28} fontWeight="600" color={colors.iconSubtle}>
            ₴{price}
          </Text>
        </YStack>
      </XStack>
    </YStack>
  )
}

export default ItemWidget
