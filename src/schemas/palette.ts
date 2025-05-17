export type ColorName =
  | 'BLUE'
  | 'RED'
  | 'BLACK'
  | 'DARK_GRAY'
  | 'LIGHT_BLUE'
  | 'PURPLE'
  | 'CYAN'
  | 'ORANGE'

type ColorValue = `#${string}`

export const palette: Record<ColorName, Readonly<ColorValue>> = {
  BLUE: '#3846C8',
  RED: '#FF2B2B',
  BLACK: '#000000',
  DARK_GRAY: '#495057',
  LIGHT_BLUE: '#7F89E1',
  PURPLE: '#872BC5',
  CYAN: '#007C7C',
  ORANGE: '#e8590c',
}
