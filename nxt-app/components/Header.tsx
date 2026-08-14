import { XStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  children: React.ReactNode
  showBorder?: boolean
}

const Header: React.FC<Props> = ({ children, showBorder = true }) => {
  const colors = useColors()
  return (
    <XStack
      px="$4"
      height={64}
      items="center"
      justify="space-between"
      borderBottomWidth={showBorder ? 1 : 0}
      borderBottomColor={colors.borderStrong}
    >
      {children}
    </XStack>
  )
}

export default Header
