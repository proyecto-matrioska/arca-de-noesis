import { translateElements } from './translateElements'
import { palette } from './palette'
import { DialecticsSchema, Schema } from './schema'
import { DualityData } from './schema'
export const dual: (
  a: string,
  b: string,
  colors?: {
    color1?: string
    color2?: string
    color3?: string
    color4?: string
  }
) => Schema = (a, b, colors) => [
  {
    type: 'text',
    x: 108,
    y: 24,
    textAlign: 'center',
    fontSize: 28,
    text: a,
    strokeColor: colors?.color1 || palette.BLUE,
  },
  {
    type: 'text',
    x: 108,
    y: 110,
    textAlign: 'center',
    fontSize: 28,
    text: b,
    strokeColor: colors?.color2 || palette.RED,
  },
  {
    type: 'ellipse',
    strokeColor: colors?.color3 || palette.BLUE,
    x: 0,
    y: 0,
    width: 217,
    height: 217,
  },
  {
    type: 'ellipse',
    strokeColor: colors?.color4 || palette.RED,
    x: 27,
    y: 62,
    width: 163,
    height: 137,
  },
]

export const duality: (data: DualityData) => Schema = ([a, b, c, d]) =>
  dual(a, b).concat(
    translateElements(
      300,
      0,
      dual(c, d, { color3: palette.RED, color4: palette.BLUE })
    )
  )

const dualityIndex: (index: number) => Schema = index => [
  {
    type: 'text',
    x: -120,
    y: -40,
    textAlign: 'center',
    fontSize: 20,
    text: `${index + 1}:`,
    strokeColor: palette.ORANGE,
  },
]

const elementDescriptions: () => Schema = () => [
  {
    type: 'text',
    x: 250,
    y: -80,
    textAlign: 'center',
    fontSize: 20,
    text: 'dualidad intensional/compleja',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 1150,
    y: -80,
    textAlign: 'center',
    fontSize: 20,
    text: 'dualidad empírica/simple',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 100,
    y: -40,
    textAlign: 'center',
    fontSize: 20,
    text: 'dual intensional/complejo',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 400,
    y: -40,
    textAlign: 'center',
    fontSize: 20,
    text: 'dual empírico/simple',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 1000,
    y: -40,
    textAlign: 'center',
    fontSize: 20,
    text: 'dual intensional/complejo',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 1300,
    y: -40,
    textAlign: 'center',
    fontSize: 20,
    text: 'dual empírico/simple',
    strokeColor: palette.ORANGE,
  },
]

const intensionFormContext: (isEven: boolean) => Schema = isEven => [
  {
    type: 'text',
    x: -20,
    y: 30,
    textAlign: 'right',
    fontSize: 20,
    text: isEven ? 'intensión' : 'contexto',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: -20,
    y: 120,
    textAlign: 'right',
    fontSize: 20,
    text: isEven ? 'extensión' : 'sentido',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 540,
    y: 30,
    textAlign: 'left',
    fontSize: 20,
    text: isEven ? 'esencia' : 'informa',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 540,
    y: 120,
    textAlign: 'left',
    fontSize: 20,
    text: isEven ? 'sustancia' : 'forma',
    strokeColor: palette.ORANGE,
  },
]

export const dualitySequence: DialecticsSchema = (dualities, schemaOptions) =>
  dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      400 * i + ((i + 1) % 2) * 30,
      duality(x)
        .concat(translateElements(900, 0, duality(y)))
        .concat(schemaOptions.showDualityIndex.value ? dualityIndex(i) : [])
        .concat(
          schemaOptions.elementDescriptions.value ? elementDescriptions() : []
        )
        .concat(
          schemaOptions.intensionFormContext.value
            ? intensionFormContext(i % 2 === 0).concat(
                translateElements(900, 0, intensionFormContext(i % 2 === 0))
              )
            : []
        )
    )
  )
