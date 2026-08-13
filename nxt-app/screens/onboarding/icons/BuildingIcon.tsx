import Svg, { Rect } from 'react-native-svg'

import useColors from '@constants/useColors'

interface Props {
  size?: number
  color?: string
}

const BuildingIcon: React.FC<Props> = ({ size = 96, color }) => {
  const colors = useColors()
  const fill = color ?? colors.stone

  return (
    <Svg width={size} height={size * 0.75} viewBox="0 0 160 120">
      <Rect x={16} y={56} width={36} height={56} rx={8} fill={fill} />
      <Rect x={62} y={16} width={36} height={96} rx={8} fill={fill} />
      <Rect x={108} y={38} width={36} height={74} rx={8} fill={fill} />
    </Svg>
  )
}

export default BuildingIcon
