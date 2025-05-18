import { translateElements } from './transformations/translateElements'
import { palette } from "./palette"
import { DialecticsSchema, Schema } from './schema'
import { DualityData } from './schema'
import { textElement } from './elements/textElement'
import { ellipseElement } from './elements/ellpiseElement'

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
  textElement(108, 24, a, 28, colors?.color1 || palette.BLUE),
  textElement(108, 110, b, 28, colors?.color2 || palette.RED),
  ellipseElement(0, 0, 217, 217, colors?.color3 || palette.BLUE),
  ellipseElement(27, 62, 163, 137, colors?.color4 || palette.RED),
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
  textElement(-120, -40, `${index + 1}:`, 20, palette.ORANGE),
]

const elementDescriptions: () => Schema = () => [
  textElement(250, -80, 'dualidad intensional/compleja', 20, palette.ORANGE),
  textElement(1150, -80, 'dualidad empírica/simple', 20, palette.ORANGE),
  textElement(100, -40, 'dual intensional/complejo', 20, palette.ORANGE),
  textElement(400, -40, 'dual empírico/simple', 20, palette.ORANGE),
  textElement(1000, -40, 'dual intensional/complejo', 20, palette.ORANGE),
  textElement(1300, -40, 'dual empírico/simple', 20, palette.ORANGE),
]

const intensionFormContext: (isEven: boolean) => Schema = isEven => [
  textElement(-20, 30, isEven ? 'intensión' : 'contexto', 20, palette.ORANGE, {
    textAlign: 'right',
  }),
  textElement(-20, 120, isEven ? 'extensión' : 'sentido', 20, palette.ORANGE, {
    textAlign: 'right',
  }),
  textElement(540, 30, isEven ? 'esencia' : 'informa', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
  textElement(540, 120, isEven ? 'sustancia' : 'forma', 20, palette.ORANGE, {
    textAlign: 'left',
  }),
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
