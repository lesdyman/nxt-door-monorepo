import { Text, YStack } from 'tamagui'

const Reserved = () => {
  return (
    <YStack
      position="absolute"
      t={0}
      l={0}
      r={0}
      b={0}
      rounded={12}
      items="center"
      justify="center"
      z={1}
      pointerEvents="none"
    >
      <Text
        fontSize={36}
        fontWeight="800"
        letterSpacing={6}
        style={{ color: 'rgba(255,255,255,0.1)', transform: [{ rotate: '-20deg' }] }}
      >
        RESERVED
      </Text>
    </YStack>
  )
}

export default Reserved
