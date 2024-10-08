import { translateElements } from './translateElements'
import { palette } from './palette'
import { swapTetrads } from './swapTetrads'

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
    color2: palette.BLUE,
    color3: palette.RED,
    color4: palette.BLUE,
    color5: palette.RED,
    color6: palette.BLUE,
  })
    .concat(
      translateElements(
        450,
        0,
        triple(...d, {
          color2: palette.BLUE,
          color3: palette.RED,
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
          color2: palette.BLUE,
          color3: palette.RED,
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
          color2: palette.BLUE,
          color3: palette.RED,
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

const squareElementDescriptions = (intentional, schemaOptions) =>
  schemaOptions.elementDescriptions.value
    ? [
        {
          type: 'text',
          x: 335,
          y: -120,
          textAlign: 'center',
          fontSize: 20,
          text:
            intentional === 1
              ? 'dualidad intensional/compleja'
              : intentional === 2
              ? 'dualidad empírica/simple'
              : '',
          strokeColor: palette.ORANGE,
        },
        {
          type: 'text',
          x: 335,
          y: 450,
          textAlign: 'center',
          fontSize: 20,
          text: 'eje intensional/\ncomplejo',
          strokeColor: palette.ORANGE,
        },
        {
          type: 'text',
          x: 335,
          y: 0,
          textAlign: 'center',
          fontSize: 20,
          text: 'eje empírico/\nsimple',
          strokeColor: palette.ORANGE,
        },
      ]
    : []

const formAndContextAnnotation = () => [
  {
    type: 'text',
    x: -114,
    y: 413,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'sentido',
  },
  {
    type: 'text',
    x: -125,
    y: 475,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'intensión',
  },
  {
    type: 'text',
    x: -140,
    y: 565,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'sustancia',
  },
  {
    type: 'text',
    x: -112,
    y: -40,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'informa',
  },
  {
    type: 'text',
    x: -113,
    y: 22,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'esencia',
  },
  {
    type: 'text',
    x: -138,
    y: 112,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'sustancia',
  },
  {
    type: 'text',
    x: 714,
    y: -40,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'forma',
  },
  {
    type: 'text',
    x: 714,
    y: 22,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'intensión',
  },
  {
    type: 'text',
    x: 714,
    y: 112,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'extensión',
  },
  {
    type: 'text',
    x: 716,
    y: 413,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'contexto',
  },
  {
    type: 'text',
    x: 716,
    y: 475,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'esencia',
  },
  {
    type: 'text',
    x: 716,
    y: 565,
    strokeColor: palette.ORANGE,
    fontSize: 20,
    text: 'extensión',
  },
]

export const tripleSquareSequence = (dualities, schemaOptions) =>
  [
    [
      ['', '', '', ''],
      ['', '', '', ''],
    ],
    ...dualities,
  ].flatMap(([a, b], i, mapArray) =>
    translateElements(
      0,
      1000 * i,
      tripleSquare(
        ...toTriples(a, mapArray[i + 1] ? mapArray[i + 1][0] : ['', '', '', ''])
      )
        .concat(
          schemaOptions.elementDescriptions.value
            ? squareElementDescriptions(1, schemaOptions)
            : []
        )
        .concat(
          schemaOptions.intensionFormContext.value
            ? formAndContextAnnotation()
            : []
        )
        .concat(
          translateElements(
            1200,
            0,
            empiricalTripleSquare(
              ...toEmpiricalTriples(
                mapArray[i + 1] ? mapArray[i + 1][0] : a,
                mapArray[i + 1] ? mapArray[i + 1][1] : ['', '', '', '']
              )
            )
              .concat(
                schemaOptions.elementDescriptions.value
                  ? squareElementDescriptions(2, schemaOptions)
                  : []
              )
              .concat(
                schemaOptions.intensionFormContext.value
                  ? formAndContextAnnotation()
                  : []
              )
          )
        )
    )
  )

export const empiricalTripleSquareSequence = (dualities, schemaOptions) =>
  tripleSquareSequence(dualities.map(swapTetrads), schemaOptions)
