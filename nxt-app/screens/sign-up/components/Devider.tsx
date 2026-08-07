import { View } from 'tamagui'

import useColors from '@constants/useColors'

const Devider = () => {
  const colors = useColors()
  return <View flex={1} height={1} bg={colors.border} />
}

export default Devider
