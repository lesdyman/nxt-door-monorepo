import { XStack } from 'tamagui'

import useColors from '@constants/useColors'

interface Props {
  children: React.ReactNode
}

const Header: React.FC<Props> = ({ children }) => {
  const colors = useColors()
  return (
    <XStack
      px="$4"
      height={64}
      items="center"
      justify="space-between"
      borderBottomWidth={1}
      borderBottomColor={colors.borderStrong}
    >
      {children}
    </XStack>
  )
}

export default Header
