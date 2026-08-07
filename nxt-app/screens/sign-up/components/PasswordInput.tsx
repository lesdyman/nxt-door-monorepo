import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { Eye, EyeOff } from 'lucide-react-native'
import { InputProps, XStack } from 'tamagui'

import FormInput from '@components/FormInput'
import useColors from '@constants/useColors'

const PasswordInput: React.FC<InputProps> = (props) => {
  const colors = useColors()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <XStack position="relative" items="center">
      <FormInput flex={1} pr={44} secureTextEntry={!isVisible} {...props} />
      <TouchableOpacity
        onPress={() => setIsVisible((value) => !value)}
        style={{ position: 'absolute', right: 12 }}
      >
        {isVisible ? (
          <EyeOff size={20} color={colors.textSecondary} />
        ) : (
          <Eye size={20} color={colors.textSecondary} />
        )}
      </TouchableOpacity>
    </XStack>
  )
}

export default PasswordInput
