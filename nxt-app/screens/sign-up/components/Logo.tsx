import { Avatar, Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'

const Logo = () => {
  const colors = useColors()
  return (
    <YStack items="center" p="$4" gap="$1">
      <Avatar circular size="$4" borderWidth={1} borderColor={colors.border}>
        <Avatar.Image src={require('../../../assets/icon.png')} />
        <Avatar.Fallback items="center" justify="center" bg={colors.background}>
          <Text color={colors.brand} fontSize={24} fontWeight="600">
            ND
          </Text>
        </Avatar.Fallback>
      </Avatar>
      <Text fontSize={16} lineHeight={24} color={colors.textPrimary}>
        Create an account
      </Text>
      <Text fontSize={14} lineHeight={20} color={colors.stone}>
        Connect with your neighborhood today
      </Text>
    </YStack>
  )
}

export default Logo
