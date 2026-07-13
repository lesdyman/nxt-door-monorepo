import { useTheme } from 'tamagui'

import { darkColors } from './colors'

type Colors = typeof darkColors
type ColorKey = keyof Colors

const colorKeys = Object.keys(darkColors) as ColorKey[]

const useColors = (): Colors => {
  const theme = useTheme()
  const result: Record<string, string> = {}

  for (const key of colorKeys) {
    const themeValue = (theme as unknown as Record<string, { val: string } | undefined>)[key]
    result[key] = themeValue?.val ?? darkColors[key]
  }

  return result as Colors
}

export default useColors
