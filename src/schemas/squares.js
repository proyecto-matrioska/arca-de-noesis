import { palette } from './palette'
import { translateElements } from './translateElements'

export const square = ([a, b, c, d]) => [
  {
    type: 'text',
    x: 0,
    y: 0,
    textAlign: 'center',
    fontSize: 28,
    text: c,
    strokeColor: palette.BLUE,
  },
  {
    type: 'text',
    x: 300,
    y: 0,
    textAlign: 'center',
    fontSize: 28,
    text: d,
    strokeColor: palette.RED,
  },
  {
    type: 'text',
    x: 300,
    y: 300,
    textAlign: 'center',
    fontSize: 28,
    text: a,
    strokeColor: palette.BLUE,
  },
  {
    type: 'text',
    x: 0,
    y: 300,
    textAlign: 'center',
    fontSize: 28,
    text: b,
    strokeColor: palette.RED,
  },
  {
    type: 'line',
    x: 60,
    y: 20,
    width: 180,
    strokeStyle: 'dotted',
    strokeColor: palette.LIGHT_BLUE,
  },
  {
    type: 'line',
    x: 60,
    y: 320,
    width: 180,
    strokeStyle: 'dotted',
    strokeColor: palette.LIGHT_BLUE,
  },
  {
    type: 'line',
    x: 0,
    y: 50,
    width: 1,
    height: 240,
    strokeStyle: 'dotted',
    strokeColor: palette.PURPLE,
  },
  {
    type: 'line',
    x: 300,
    y: 50,
    width: 1,
    height: 240,
    strokeStyle: 'dotted',
    strokeColor: palette.PURPLE,
  },
]

export const complexSquare = (s1, [a, b, c, d]) =>
  square(s1).concat([
    {
      type: 'text',
      x: 100,
      y: 85,
      textAlign: 'center',
      fontSize: 20,
      text: a,
      strokeColor: palette.BLUE,
      angle: 0.7854,
    },
    {
      type: 'text',
      x: 75,
      y: 110,
      textAlign: 'center',
      fontSize: 20,
      text: b,
      strokeColor: palette.RED,
      angle: 0.7854,
    },
    {
      type: 'text',
      x: 70,
      y: 210,
      textAlign: 'center',
      fontSize: 20,
      text: c,
      strokeColor: palette.BLUE,
      angle: -0.7854,
    },
    {
      type: 'text',
      x: 95,
      y: 230,
      textAlign: 'center',
      fontSize: 20,
      text: d,
      strokeColor: palette.RED,
      angle: -0.7854,
    },
    {
      type: 'line',
      x: 20,
      y: 50,
      width: 260,
      height: 240,
      strokeStyle: 'dotted',
      strokeColor: palette.CYAN,
    },
    {
      type: 'line',
      x: 280,
      y: 50,
      width: -260,
      height: 240,
      strokeStyle: 'dotted',
      strokeColor: palette.CYAN,
    },
  ])

export const squareSequence = dualities =>
  dualities.flatMap(([x, y], i) =>
    translateElements(0, 500 * i + ((i + 1) % 2) * 50, square(x)).concat(
      translateElements(600, 500 * i + ((i + 1) % 2) * 50, square(y))
    )
  )

export const complexSquareSequence = dualities =>
  dualities.flatMap(([x, y], i) =>
    translateElements(0, 500 * i + ((i + 1) % 2) * 50, complexSquare(x, y))
  )
