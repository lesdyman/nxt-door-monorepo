import { createAnimations } from '@tamagui/animations-react-native'
import { defaultConfig } from '@tamagui/config/v5'
import { createTamagui } from 'tamagui'

import { darkColors, lightColors } from './constants/colors'

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  animations: createAnimations({
    fast: { type: 'spring', damping: 26, mass: 0.6, stiffness: 300 },
    medium: { type: 'spring', damping: 18, mass: 0.8, stiffness: 180 },
    slow: { type: 'spring', damping: 20, stiffness: 60 },
  }),
  themes: {
    ...defaultConfig.themes,
    dark: { ...defaultConfig.themes.dark, ...darkColors },
    light: { ...defaultConfig.themes.light, ...lightColors },
  },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}
