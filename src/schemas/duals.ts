import { translateElements } from './transformations/translateElements'
import { palette } from './palette'
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

const elementDescriptions: (
  translations: (key: string) => string
) => Schema = translations => [
  textElement(
    250,
    -80,
    translations('Schemas.Annotations.duals.dualidad intensional/compleja'),
    20,
    palette.ORANGE
  ),
  textElement(
    1150,
    -80,
    translations('Schemas.Annotations.duals.dualidad empírica/simple'),
    20,
    palette.ORANGE
  ),
  textElement(
    100,
    -40,
    translations('Schemas.Annotations.duals.dual intensional/complejo'),
    20,
    palette.ORANGE
  ),
  textElement(
    400,
    -40,
    translations('Schemas.Annotations.duals.dual empírico/simple'),
    20,
    palette.ORANGE
  ),
  textElement(
    1000,
    -40,
    translations('Schemas.Annotations.duals.dual intensional/complejo'),
    20,
    palette.ORANGE
  ),
  textElement(
    1300,
    -40,
    translations('Schemas.Annotations.duals.dual empírico/simple'),
    20,
    palette.ORANGE
  ),
]

const intensionFormContext: (
  isEven: boolean,
  translations: (key: string) => string
) => Schema = (isEven, translations) => [
  textElement(
    -20,
    30,
    isEven
      ? translations('Schemas.Annotations.duals.intensión')
      : translations('Schemas.Annotations.duals.contexto'),
    20,
    palette.ORANGE,
    {
      textAlign: 'right',
    }
  ),
  textElement(
    -20,
    120,
    isEven
      ? translations('Schemas.Annotations.duals.extensión')
      : translations('Schemas.Annotations.duals.sentido'),
    20,
    palette.ORANGE,
    {
      textAlign: 'right',
    }
  ),
  textElement(
    540,
    30,
    isEven
      ? translations('Schemas.Annotations.duals.esencia')
      : translations('Schemas.Annotations.duals.informa'),
    20,
    palette.ORANGE,
    {
      textAlign: 'left',
    }
  ),
  textElement(
    540,
    120,
    isEven
      ? translations('Schemas.Annotations.duals.sustancia')
      : translations('Schemas.Annotations.duals.forma'),
    20,
    palette.ORANGE,
    {
      textAlign: 'left',
    }
  ),
]

const annotationLabel: (text: string, x: number) => Schema = (text, x) =>
  text
    ? [
        textElement(x, 240, text, 18, palette.ORANGE, {
          textAlign: 'center',
        }),
      ]
    : []

export const dualitySequence: DialecticsSchema = (
  dualities,
  schemaOptions,
  translations,
  annotations
) =>
  dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      400 * i + ((i + 1) % 2) * 30,
      duality(x)
        .concat(translateElements(900, 0, duality(y)))
        .concat(schemaOptions.showDualityIndex.value ? dualityIndex(i) : [])
        .concat(
          schemaOptions.elementDescriptions.value
            ? elementDescriptions(translations)
            : []
        )
        .concat(
          schemaOptions.intensionFormContext.value
            ? intensionFormContext(i % 2 === 0, translations).concat(
                translateElements(
                  900,
                  0,
                  intensionFormContext(i % 2 === 0, translations)
                )
              )
            : []
        )
        .concat(annotations ? annotationLabel(annotations[i]?.[0] ?? '', 258) : [])
        .concat(annotations ? translateElements(900, 0, annotationLabel(annotations[i]?.[1] ?? '', 258)) : [])
    )
  )
