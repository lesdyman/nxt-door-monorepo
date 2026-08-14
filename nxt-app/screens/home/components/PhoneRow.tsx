import { Linking } from 'react-native'

import { Text, XStack } from 'tamagui'

import useColors from '@constants/useColors'

interface PhoneRowProps {
  icon: React.ReactNode
  label: string
  phone: string | null | undefined
}

const PhoneRow: React.FC<PhoneRowProps> = ({ icon, label, phone }) => {
  const colors = useColors()
  return (
    <XStack items="center" gap="$2">
      {icon}
      <Text fontSize={14} lineHeight={20} color={colors.textMuted}>
        {label}:{' '}
        <Text
          fontSize={14}
          lineHeight={20}
          color={colors.linkAccent}
          textDecorationLine={phone ? 'underline' : 'none'}
          onPress={phone ? () => Linking.openURL(`tel:${phone}`) : undefined}
          pressStyle={phone ? { opacity: 0.6 } : undefined}
        >
          {phone || 'N/A'}
        </Text>
      </Text>
    </XStack>
  )
}

export default PhoneRow
