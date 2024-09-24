import { translateElements } from './translateElements'
import { palette } from './palette'

export const toTriples = (x, y) => [
  [y[0], x[2], x[1]],
  [y[1], x[0], x[3]],
  [y[2], x[2], x[3]],
  [y[3], x[0], x[1]],
]

export const toEmpiricalTriples = (x, y) => [
  [y[0], x[2], x[0]],
  [y[1], x[0], x[2]],
  [y[2], x[3], x[1]],
  [y[3], x[1], x[3]],
]

const squareLines = () => [
  {
    type: 'line',
    x: 285,
    y: 80,
    width: 100,
    strokeStyle: 'dotted',
    strokeColor: palette.LIGHT_BLUE,
  },
  {
    type: 'line',
    x: 285,
    y: 530,
    width: 100,
    strokeStyle: 'dotted',
    strokeColor: palette.LIGHT_BLUE,
  },
  {
    type: 'line',
    x: 105,
    y: 260,
    width: 1,
    height: 100,
    strokeStyle: 'dotted',
    strokeColor: palette.PURPLE,
  },
  {
    type: 'line',
    x: 555,
    y: 260,
    width: 1,
    height: 100,
    strokeStyle: 'dotted',
    strokeColor: palette.PURPLE,
  },
]

export const triple = (
  a,
  b,
  c,
  {
    color1 = palette.BLACK,
    color2 = palette.RED,
    color3 = palette.BLUE,
    color4 = palette.BLACK,
    color5 = palette.BLUE,
    color6 = palette.RED,
  } = {}
) => [
  {
    type: 'text',
    x: 108,
    y: -42,
    textAlign: 'center',
    fontSize: 28,
    text: a,
    strokeColor: color1,
  },
  {
    type: 'text',
    x: 110,
    y: 20,
    textAlign: 'center',
    fontSize: 28,
    text: b,
    strokeColor: color2,
  },
  {
    type: 'text',
    x: 108,
    y: 110,
    textAlign: 'center',
    fontSize: 28,
    text: c,
    strokeColor: color3,
  },
  {
    type: 'ellipse',
    strokeColor: color4,
    x: -41,
    y: -69,
    width: 299,
    height: 295,
  },
  {
    type: 'ellipse',
    strokeColor: color5,
    x: -8,
    y: 0,
    width: 236,
    height: 217,
  },
  {
    type: 'ellipse',
    strokeColor: color6,
    x: 27,
    y: 62,
    width: 163,
    height: 137,
  },
]

export const tripleSquare = (a, b, c, d) =>
  triple(...c, {
    color4: palette.BLUE,
    color5: palette.RED,
    color6: palette.BLUE,
  })
    .concat(
      translateElements(
        450,
        0,
        triple(...d, {
          color4: palette.RED,
          color5: palette.BLUE,
          color6: palette.RED,
        })
      )
    )
    .concat(
      translateElements(
        450,
        450,
        triple(...a, {
          color4: palette.BLUE,
          color5: palette.RED,
          color6: palette.BLUE,
        })
      )
    )
    .concat(
      translateElements(
        0,
        450,
        triple(...b, {
          color4: palette.RED,
          color5: palette.BLUE,
          color6: palette.RED,
        })
      )
    )
    .concat(squareLines())

export const empiricalTripleSquare = (a, b, c, d) =>
  triple(...c, {
    color1: palette.BLUE,
    color2: palette.RED,
    color3: palette.BLUE,
    color4: palette.RED,
    color5: palette.RED,
    color6: palette.RED,
  })
    .concat(
      translateElements(
        450,
        0,
        triple(...d, {
          color1: palette.RED,
          color2: palette.BLUE,
          color3: palette.RED,
          color4: palette.RED,
          color5: palette.RED,
          color6: palette.RED,
        })
      )
    )
    .concat(
      translateElements(
        450,
        450,
        triple(...a, {
          color1: palette.BLUE,
          color2: palette.RED,
          color3: palette.BLUE,
          color4: palette.BLUE,
          color5: palette.BLUE,
          color6: palette.BLUE,
        })
      )
    )
    .concat(
      translateElements(
        0,
        450,
        triple(...b, {
          color1: palette.RED,
          color2: palette.BLUE,
          color3: palette.RED,
          color4: palette.BLUE,
          color5: palette.BLUE,
          color6: palette.BLUE,
        })
      )
    )
    .concat(squareLines())
