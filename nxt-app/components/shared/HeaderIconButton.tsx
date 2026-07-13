import { JSX } from 'react'

import { Button } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  icon: JSX.Element
  onPress?: () => void
}

const HeaderIconButton: React.FC<Props> = ({ icon, onPress }) => {
  const colors = useColors()
  return (
    <Button
      height={40}
      width={40}
      unstyled
      style={{
        backgroundColor: colors.surface,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      }}
      borderColor={colors.borderStrong}
      borderWidth={1}
      icon={icon}
      onPress={onPress}
    />
  )
}

export default HeaderIconButton
