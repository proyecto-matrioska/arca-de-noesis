import { translateElements } from './transformations/translateElements'
import { palette } from "./palette"
import { swapTetrads } from './transformations/swapTetrads'
import {
  DialecticsDataEntry,
  DialecticsSchema,
  Quadruplet,
  Schema,
  Triplet,
} from './schema'
import { DualityData } from './schema'
import { SchemaOption } from '../state/uiSlice'
import { lineElement } from './elements/lineElement'
import { textElement } from './elements/textElement'
import { ellipseElement } from './elements/ellpiseElement'

export const toTriples: (
  x: DualityData,
  y: DualityData
) => Quadruplet<Triplet<string>> = (x, y) => [
  [y[0], x[2], x[1]],
  [y[1], x[0], x[3]],
  [y[2], x[2], x[3]],
  [y[3], x[0], x[1]],
]

export const toEmpiricalTriples: (
  x: DualityData,
  y: DualityData
) => Quadruplet<Triplet<string>> = (x, y) => [
  [y[0], x[2], x[0]],
  [y[1], x[0], x[2]],
  [y[2], x[3], x[1]],
  [y[3], x[1], x[3]],
]

const squareLines: () => Schema = () => [
  lineElement(285, 80, 100, 1, palette.LIGHT_BLUE, {
    strokeStyle: 'dotted',
  }),
  lineElement(285, 530, 100, 1, palette.LIGHT_BLUE, {
    strokeStyle: 'dotted',
  }),
  lineElement(105, 260, 1, 100, palette.PURPLE, {
    strokeStyle: 'dotted',
  }),
  lineElement(555, 260, 1, 100, palette.PURPLE, {
    strokeStyle: 'dotted',
  }),
]

export const triple: (
  a: string,
  b: string,
  c: string,
  colors?: {
    color1?: string
    color2?: string
    color3?: string
    color4?: string
    color5?: string
    color6?: string
  }
) => Schema = (
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
  textElement(108, -42, a, 28, color1, {
    textAlign: 'center',
  }),
  textElement(110, 20, b, 28, color2, {
    textAlign: 'center',
  }),
  textElement(108, 110, c, 28, color3, {
    textAlign: 'center',
  }),
  ellipseElement(-41, -69, 299, 295, color4),
  ellipseElement(-8, 0, 236, 217, color5),
  ellipseElement(27, 62, 163, 137, color6),
]

export const tripleSquare: (
  a: [string, string, string],
  b: [string, string, string],
  c: [string, string, string],
  d: [string, string, string]
) => Schema = (a, b, c, d) =>
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

export const empiricalTripleSquare: (
  a: [string, string, string],
  b: [string, string, string],
  c: [string, string, string],
  d: [string, string, string]
) => Schema = (a, b, c, d) =>
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

const dualityIndexAnnotation: (index: number) => Schema = index => [
  textElement(-100, -100, `${index + 1}:`, 20, palette.ORANGE, {
    textAlign: 'center',
  }),
]

const squareElementDescriptions: (
  intentional: number,
  schemaOptions: { [key: string]: SchemaOption }
) => Schema = (intentional, schemaOptions) =>
  schemaOptions.elementDescriptions.value
    ? [
        textElement(
          335,
          -120,
          intentional === 1
            ? 'dualidad intensional/compleja'
            : intentional === 2
            ? 'dualidad empírica/simple'
            : '',
          20,
          palette.ORANGE,
          {
            textAlign: 'center',
          }
        ),
        textElement(
          335,
          450,
          'eje intensional/\ncomplejo',
          20,
          palette.ORANGE,
          {
            textAlign: 'center',
          }
        ),
        textElement(335, 0, 'eje empírico/\nsimple', 20, palette.ORANGE, {
          textAlign: 'center',
        }),
      ]
    : []

const formAndContextAnnotation: () => Schema = () => [
  textElement(-114, 413, 'sentido', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(-125, 475, 'intensión', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(-140, 565, 'sustancia', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(-112, -40, 'informa', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(-113, 22, 'esencia', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(-138, 112, 'sustancia', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(714, -40, 'forma', 20, palette.ORANGE, { textAlign: undefined }),
  textElement(714, 22, 'intensión', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(714, 122, 'extensión', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(716, 413, 'contexto', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(716, 475, 'esencia', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(716, 565, 'extensión', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
]

export const tripleSquareSequence: DialecticsSchema = (
  dualities,
  schemaOptions
) =>
  (
    [
      [
        ['', '', '', ''],
        ['', '', '', ''],
      ],
      ...dualities,
    ] as Array<DialecticsDataEntry>
  ).flatMap(([a, b], i, mapArray) =>
    translateElements(
      0,
      1000 * i,
      tripleSquare(
        ...toTriples(a, mapArray[i + 1] ? mapArray[i + 1][0] : ['', '', '', ''])
      )
        .concat(
          schemaOptions.showDualityIndex.value ? dualityIndexAnnotation(i) : []
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

export const empiricalTripleSquareSequence: DialecticsSchema = (
  dualities,
  schemaOptions
) => tripleSquareSequence(dualities.map(swapTetrads), schemaOptions)
