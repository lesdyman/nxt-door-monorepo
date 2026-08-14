import Svg, { Path } from 'react-native-svg'

import useColors from '@constants/useColors'

interface Props {
  size?: number
  color?: string
}

const HouseIcon: React.FC<Props> = ({ size = 72, color }) => {
  const colors = useColors()
  const fill = color ?? colors.iconSubtle

  return (
    <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <Path
        d="M56 32V0H16V16H0V72H32V56H40V72H72V32H56ZM16 64H8V56H16V64ZM16 48H8V40H16V48ZM16 32H8V24H16V32ZM32 48H24V40H32V48ZM32 32H24V24H32V32ZM48 48H40V40H48V48ZM48 32H40V24H48V32ZM64 48H56V40H64V48ZM64 32H56V24H64V32Z"
        fill={fill}
      />
    </Svg>
  )
}

export default HouseIcon
