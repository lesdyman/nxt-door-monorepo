import { Avatar, Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'
const LogoBlock = () => {
  const colors = useColors()
  return (
    <YStack items="center" pt="$12" gap="$3" mx="$8">
      <Avatar circular size="$8" borderWidth={1} borderColor={colors.border}>
        <Avatar.Image src={require('../../../assets/icon.png')} />
        <Avatar.Fallback items="center" justify="center" bg={colors.background}>
          <Text color={colors.brand} fontSize={24} fontWeight="600">
            ND
          </Text>
        </Avatar.Fallback>
      </Avatar>
      <Text color={colors.pearl} fontSize={28} lineHeight={34}>
        Next Door
      </Text>
      <Text color={colors.textMuted} text="center" numberOfLines={2} fontSize={16} lineHeight={24}>
        Local marketplace of your residential complex
      </Text>
    </YStack>
  )
}
export default LogoBlock
