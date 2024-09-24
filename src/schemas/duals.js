import { translateElements } from './translateElements'
import { palette } from './palette'

export const dual = (
  a,
  b,
  {
    color1 = palette.BLUE,
    color2 = palette.RED,
    color3 = palette.BLUE,
    color4 = palette.RED,
  } = {}
) => [
  {
    type: 'text',
    x: 108,
    y: 24,
    textAlign: 'center',
    fontSize: 28,
    text: a,
    strokeColor: color1,
  },
  {
    type: 'text',
    x: 108,
    y: 110,
    textAlign: 'center',
    fontSize: 28,
    text: b,
    strokeColor: color2,
  },
  {
    type: 'ellipse',
    strokeColor: color3,
    x: 0,
    y: 0,
    width: 217,
    height: 217,
  },
  {
    type: 'ellipse',
    strokeColor: color4,
    x: 27,
    y: 62,
    width: 163,
    height: 137,
  },
]

export const duality = ([a, b, c, d]) =>
  dual(a, b).concat(
    translateElements(
      300,
      0,
      dual(c, d, { color3: palette.RED, color4: palette.BLUE })
    )
  )
