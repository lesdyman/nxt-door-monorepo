import { ColorTokens, Input, InputProps } from 'tamagui'

import useColors from '@constants/useColors'

const FormInput: React.FC<InputProps> = (props) => {
  const colors = useColors()
  return (
    <Input
      bg={colors.surface}
      color={colors.textPrimary}
      borderColor={colors.border}
      focusStyle={{ borderColor: colors.borderFocus }}
      placeholderTextColor={colors.textSecondary as ColorTokens}
      {...props}
    />
  )
}

export default FormInput
