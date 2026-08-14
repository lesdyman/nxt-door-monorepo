import Svg, { Circle, Polyline } from 'react-native-svg'

import useColors from '@constants/useColors'

interface Props {
  size?: number
  badgeColor?: string
}

const OnboardingSuccessIcon: React.FC<Props> = ({ size = 32, badgeColor }) => {
  const colors = useColors()
  const badge = badgeColor ?? colors.brand
  const ring = colors.background

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      {/* Success checkmark badge — tight canvas, meant to be positioned as a corner overlay */}
      <Circle cx={16} cy={16} r={14} fill={badge} stroke={ring} strokeWidth={3} />
      <Polyline
        points="9,16 14,21 23,11"
        fill="none"
        stroke={colors.white}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default OnboardingSuccessIcon
