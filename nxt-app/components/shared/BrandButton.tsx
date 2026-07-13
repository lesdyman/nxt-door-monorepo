import { Button, ButtonProps } from 'tamagui'

import useColors from '@constants/useColors'

export const useBrandInteractionStyle = () => {
  const colors = useColors()
  return { bg: colors.brand, opacity: 0.6, borderColor: colors.brand }
}

const BrandButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const colors = useColors()
  const brandInteractionStyle = useBrandInteractionStyle()
  return (
    <Button
      bg={colors.brand}
      pressStyle={brandInteractionStyle}
      focusStyle={brandInteractionStyle}
      {...props}
    >
      {children}
    </Button>
  )
}

export default BrandButton
