import { DialecticsSchema, Schema } from './schema'
import { DualityData } from './schema'
import { groupByTetrads } from './transformations/groupByTetrads'
import { groupByTriads } from './transformations/groupByTriads'
import { palette } from "./palette"
import { translateElements } from './transformations/translateElements'
import { SchemaOption } from '../state/uiSlice'
import { textElement } from './elements/textElement'
import { lineElement } from './elements/lineElement'
import { ellipseElement } from './elements/ellpiseElement'

export const square: (duality: DualityData) => Schema = ([a, b, c, d]) => [
  textElement(0, 0, c, 28, palette.BLUE, {
    textAlign: 'center',
  }),
  textElement(300, 0, d, 28, palette.RED, {
    textAlign: 'center',
  }),
  textElement(300, 300, a, 28, palette.BLUE, {
    textAlign: 'center',
  }),
  textElement(0, 300, b, 28, palette.RED, {
    textAlign: 'center',
  }),
  lineElement(60, 20, 180, 1, palette.LIGHT_BLUE, {
    strokeStyle: 'dotted',
  }),
  lineElement(60, 320, 180, 1, palette.LIGHT_BLUE, {
    strokeStyle: 'dotted',
  }),
  lineElement(0, 50, 1, 240, palette.PURPLE, {
    strokeStyle: 'dotted',
  }),
  lineElement(300, 50, 1, 240, palette.PURPLE, {
    strokeStyle: 'dotted',
  }),
]

export const complexSquare: (
  d1: DualityData,
  d2: DualityData,
  schemaOptions: Record<string, SchemaOption>
) => Schema = (d1, [a, b, c, d], schemaOptions) =>
  square(d1)
    .concat([
      textElement(100, 85, a, 20, palette.BLUE, {
        textAlign: 'center',
        angle: 0.7854,
      }),
      textElement(75, 110, b, 20, palette.RED, {
        textAlign: 'center',
        angle: 0.7854,
      }),
      textElement(70, 210, c, 20, palette.BLUE, {
        textAlign: 'center',
        angle: -0.7854,
      }),
      textElement(95, 230, d, 20, palette.RED, {
        textAlign: 'center',
        angle: -0.7854,
      }),
      lineElement(20, 50, 260, 240, palette.CYAN, {
        strokeStyle: 'dotted',
      }),
      lineElement(280, 50, -260, 240, palette.CYAN, {
        strokeStyle: 'dotted',
      }),
    ])
    .concat(
      schemaOptions.elementDescriptions.value
        ? complexSquareElementDescriptions()
        : []
    )

const dualityIndexAnnotation: (index: number) => Schema = index => [
  textElement(-100, -40, `${index + 1}:`, 20, palette.ORANGE, {
    textAlign: 'center',
  }),
]

const squareElementDescriptions: (
  intentional: number,
  schemaOptions: Record<string, SchemaOption>
) => Schema = (intentional, schemaOptions) =>
  schemaOptions.elementDescriptions.value
    ? [
        textElement(
          150,
          -100,
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
        textElement(150, 340, 'eje intensional/complejo', 20, palette.ORANGE, {
          textAlign: 'center',
        }),
        textElement(150, -30, 'eje empírico/simple', 20, palette.ORANGE, {
          textAlign: 'center',
        }),
      ]
    : []

const complexSquareElementDescriptions: () => Schema = () => [
  textElement(150, 340, 'eje intensional/complejo', 20, palette.ORANGE, {
    textAlign: 'center',
  }),
  textElement(150, -30, 'eje empírico/simple', 20, palette.ORANGE, {
    textAlign: 'center',
  }),
  textElement(470, 160, 'abstracción empírica', 20, palette.ORANGE, {
    textAlign: 'center',
  }),
  lineElement(170, 170, 180, 1, palette.ORANGE, {
    strokeStyle: 'dashed',
  }),
  textElement(-200, 60, 'eje intensional/complejo', 20, palette.ORANGE, {
    textAlign: 'center',
  }),
  lineElement(-70, 75, 110, 1, palette.ORANGE, {
    strokeStyle: 'dashed',
  }),
  textElement(-200, 260, 'eje empírico/simple', 20, palette.ORANGE, {
    textAlign: 'center',
  }),
  lineElement(-90, 275, 110, 1, palette.ORANGE, {
    strokeStyle: 'dashed',
  }),
]

const rectagularAnnotation: (
  a: number,
  b: number,
  c: number,
  d: number
) => Schema = (a, b, c, d) => [
  ellipseElement(
    a === 0 || a === 3 ? -80 : 220,
    a > 1 ? 260 : -40,
    160,
    120,
    palette.ORANGE,
    {
      backgroundColor: 'transparent',
      strokeWidth: 2,
      strokeStyle: 'dashed',
    }
  ),
  ellipseElement(
    b === 0 || b === 3 ? 720 : 1020,
    b > 1 ? 260 : -40,
    160,
    120,
    palette.ORANGE,
    {
      backgroundColor: 'transparent',
      strokeWidth: 2,
      strokeStyle: 'dashed',
    }
  ),
  ellipseElement(
    c === 0 || c === 3 ? 720 : 1020,
    c > 1 ? 760 : 460,
    160,
    120,
    palette.ORANGE,
    {
      backgroundColor: 'transparent',
      strokeWidth: 2,
      strokeStyle: 'dashed',
    }
  ),
  ellipseElement(
    d === 0 || d === 3 ? -80 : 220,
    d > 1 ? 760 : 460,
    160,
    120,
    palette.ORANGE,
    {
      backgroundColor: 'transparent',
      strokeWidth: 2,
      strokeStyle: 'dashed',
    }
  ),
  lineElement(
    a === 0 || a === 3 ? 80 : 380,
    a > 1 ? 320 : 20,
    340 + ([1, 2].includes(a) ? 0 : 300) + ([1, 2].includes(b) ? 300 : 0),
    a <= 1 && b >= 2 ? 300 : a > 1 && b < 2 ? -300 : 0,
    palette.ORANGE,
    {
      strokeWidth: 2,
      strokeStyle: 'dashed',
      backgroundColor: 'transparent',
    }
  ),
  lineElement(
    d === 0 || d === 3 ? 80 : 380,
    d > 1 ? 820 : 520,
    340 + ([1, 2].includes(d) ? 0 : 300) + ([1, 2].includes(c) ? 300 : 0),
    d <= 1 && c >= 2 ? 300 : d > 1 && c < 2 ? -300 : 0,
    palette.ORANGE,
    {
      strokeWidth: 2,
      strokeStyle: 'dashed',
    }
  ),
  lineElement(
    b === 0 || b === 3 ? 800 : 1100,
    b > 1 ? 380 : 80,
    [0, 3].includes(b) && [1, 2].includes(c)
      ? 300
      : [1, 2].includes(b) && [0, 3].includes(c)
      ? -300
      : 1,
    [2, 3].includes(b) && [0, 1].includes(c)
      ? 80
      : [0, 1].includes(b) && [2, 3].includes(c)
      ? 680
      : 380,
    palette.ORANGE,
    {
      strokeWidth: 2,
      strokeStyle: 'dashed',
    }
  ),
  lineElement(
    a === 0 || a === 3 ? 0 : 300,
    a > 1 ? 380 : 80,
    [0, 3].includes(a) && [1, 2].includes(d)
      ? 300
      : [1, 2].includes(a) && [0, 3].includes(d)
      ? -300
      : 1,
    [2, 3].includes(a) && [0, 1].includes(d)
      ? 80
      : [0, 1].includes(a) && [2, 3].includes(d)
      ? 680
      : 380,
    palette.ORANGE,
    {
      strokeWidth: 2,
      strokeStyle: 'dashed',
    }
  ),
]

const rectagularAnnotationParams: (
  name: string
) => [number, number, number, number] = name => {
  switch (name) {
    case 'rectangular-1':
      return [0, 0, 0, 0]
    case 'rectangular-2':
      return [1, 1, 1, 1]
    case 'rectangular-3':
      return [2, 2, 2, 2]
    case 'rectangular-4':
      return [3, 3, 3, 3]
    case 'rectangular-5':
      return [1, 0, 0, 1]
    case 'rectangular-6':
      return [2, 3, 3, 2]
    case 'rectangular-7':
      return [0, 1, 2, 3]
    case 'rectangular-8':
      return [2, 3, 0, 1]
    case 'rectangular-9':
      return [3, 3, 0, 0]
    case 'rectangular-10':
      return [2, 2, 1, 1]
    case 'trapecial-1':
      return [1, 0, 1, 0]
    case 'trapecial-2':
      return [2, 3, 2, 3]
    case 'trapecial-3':
      return [0, 1, 0, 1]
    case 'trapecial-4':
      return [3, 2, 3, 2]
    case 'trapecial-5':
      return [0, 3, 0, 3]
    case 'trapecial-6':
      return [1, 2, 1, 2]
    case 'trapecial-7':
      return [3, 0, 3, 0]
    case 'trapecial-8':
      return [2, 1, 2, 1]
    case 'trapecial-9':
      return [1, 3, 0, 2]
    case 'trapecial-10':
      return [2, 0, 3, 1]
    default:
      return [0, 0, 0, 0]
  }
}

export const squareSequence: DialecticsSchema = (dualities, schemaOptions) => {
  if (schemaOptions.arrangement.value === 'triadas')
    return groupByTriads(dualities).flatMap(([x, y, z], i) =>
      translateElements(
        0,
        1400 * i,
        translateElements(
          0,
          500,
          square(x[0])
            .concat(
              schemaOptions.showDualityIndex.value
                ? dualityIndexAnnotation(2 * i)
                : []
            )
            .concat(squareElementDescriptions(3, schemaOptions))
            .concat(
              translateElements(
                2000,
                0,
                square(x[1])
                  .concat(
                    schemaOptions.showDualityIndex.value
                      ? dualityIndexAnnotation(2 * i)
                      : []
                  )
                  .concat(squareElementDescriptions(3, schemaOptions))
              )
            )
        )
          .concat(
            translateElements(
              800,
              500,
              square(y[0])
                .concat(
                  schemaOptions.showDualityIndex.value
                    ? dualityIndexAnnotation(2 * i + 1)
                    : []
                )
                .concat(squareElementDescriptions(3, schemaOptions))
                .concat(
                  translateElements(
                    2000,
                    0,
                    square(y[1])
                      .concat(
                        schemaOptions.showDualityIndex.value
                          ? dualityIndexAnnotation(2 * i + 1)
                          : []
                      )
                      .concat(squareElementDescriptions(3, schemaOptions))
                  )
                )
            )
          )
          .concat(
            translateElements(
              400,
              0,
              square(z[0])
                .concat(
                  schemaOptions.showDualityIndex.value
                    ? dualityIndexAnnotation(2 * i + 2)
                    : []
                )
                .concat(squareElementDescriptions(3, schemaOptions))
                .concat(
                  translateElements(
                    2000,
                    0,
                    square(z[1])
                      .concat(
                        schemaOptions.showDualityIndex.value
                          ? dualityIndexAnnotation(2 * i + 2)
                          : []
                      )
                      .concat(squareElementDescriptions(3, schemaOptions))
                  )
                )
            )
          )
      )
    )
  if (schemaOptions.arrangement.value === 'tetradas')
    return groupByTetrads(dualities).flatMap(([w, x, y, z], i) =>
      translateElements(
        0,
        1400 * i,
        translateElements(
          800,
          500,
          square(w[0])
            .concat(
              schemaOptions.showDualityIndex.value
                ? dualityIndexAnnotation(4 * i)
                : []
            )
            .concat(squareElementDescriptions(3, schemaOptions))
            .concat(
              translateElements(
                2000,
                0,
                square(w[1])
                  .concat(
                    schemaOptions.showDualityIndex.value
                      ? dualityIndexAnnotation(4 * i)
                      : []
                  )
                  .concat(squareElementDescriptions(3, schemaOptions))
              )
            )
        )
          .concat(
            translateElements(
              0,
              500,
              square(x[0])
                .concat(
                  schemaOptions.showDualityIndex.value
                    ? dualityIndexAnnotation(4 * i + 1)
                    : []
                )
                .concat(squareElementDescriptions(3, schemaOptions))
                .concat(
                  translateElements(
                    2000,
                    0,
                    square(x[1])
                      .concat(
                        schemaOptions.showDualityIndex.value
                          ? dualityIndexAnnotation(4 * i + 1)
                          : []
                      )
                      .concat(squareElementDescriptions(3, schemaOptions))
                  )
                )
            )
          )
          .concat(
            translateElements(
              0,
              0,
              square(y[0])
                .concat(
                  schemaOptions.showDualityIndex.value
                    ? dualityIndexAnnotation(4 * i + 2)
                    : []
                )
                .concat(squareElementDescriptions(3, schemaOptions))
                .concat(
                  translateElements(
                    2000,
                    0,
                    square(y[1])
                      .concat(
                        schemaOptions.showDualityIndex.value
                          ? dualityIndexAnnotation(4 * i + 2)
                          : []
                      )
                      .concat(squareElementDescriptions(3, schemaOptions))
                  )
                )
            )
          )
          .concat(
            translateElements(
              800,
              0,
              square(z[0])
                .concat(
                  schemaOptions.showDualityIndex.value
                    ? dualityIndexAnnotation(4 * i + 3)
                    : []
                )
                .concat(squareElementDescriptions(3, schemaOptions))
                .concat(
                  translateElements(
                    2000,
                    0,
                    square(z[1])
                      .concat(
                        schemaOptions.showDualityIndex.value
                          ? dualityIndexAnnotation(4 * i + 3)
                          : []
                      )
                      .concat(squareElementDescriptions(3, schemaOptions))
                  )
                )
            )
          )
          .concat(
            schemaOptions.showRectangularFactorizations.value !== 'ninguna'
              ? rectagularAnnotation(
                  ...rectagularAnnotationParams(
                    schemaOptions.showRectangularFactorizations.value
                  )
                ).concat(
                  translateElements(
                    2000,
                    0,
                    rectagularAnnotation(
                      ...rectagularAnnotationParams(
                        schemaOptions.showRectangularFactorizations.value
                      )
                    )
                  )
                )
              : []
          )
      )
    )
  // default list
  return dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      700 * i + ((i + 1) % 2) * 50,
      square(x)
        .concat(translateElements(800, 0, square(y)))
        .concat(
          schemaOptions.showDualityIndex.value ? dualityIndexAnnotation(i) : []
        )
        .concat(squareElementDescriptions(1, schemaOptions))
        .concat(
          translateElements(800, 0, squareElementDescriptions(2, schemaOptions))
        )
    )
  )
}

export const complexSquareSequence: DialecticsSchema = (
  dualities,
  schemaOptions
) => {
  if (schemaOptions.arrangement.value === 'triadas')
    return groupByTriads(dualities).flatMap(([x, y, z], i) =>
      translateElements(
        0,
        1400 * i,
        translateElements(
          0,
          500,
          complexSquare(x[0], x[1], schemaOptions).concat(
            schemaOptions.showDualityIndex.value
              ? dualityIndexAnnotation(2 * i)
              : []
          )
        )
          .concat(
            translateElements(
              800,
              500,
              complexSquare(y[0], y[1], schemaOptions).concat(
                schemaOptions.showDualityIndex.value
                  ? dualityIndexAnnotation(2 * i + 1)
                  : []
              )
            )
          )
          .concat(
            translateElements(
              400,
              0,
              complexSquare(z[0], z[1], schemaOptions).concat(
                schemaOptions.showDualityIndex.value
                  ? dualityIndexAnnotation(2 * i + 2)
                  : []
              )
            )
          )
      )
    )
  if (schemaOptions.arrangement.value === 'tetradas')
    return groupByTetrads(dualities).flatMap(([w, x, y, z], i) =>
      translateElements(
        0,
        1400 * i,
        translateElements(
          800,
          500,
          complexSquare(w[0], w[1], schemaOptions).concat(
            schemaOptions.showDualityIndex.value
              ? dualityIndexAnnotation(4 * i)
              : []
          )
        )
          .concat(
            translateElements(
              0,
              500,
              complexSquare(x[0], x[1], schemaOptions).concat(
                schemaOptions.showDualityIndex.value
                  ? dualityIndexAnnotation(4 * i + 1)
                  : []
              )
            )
          )
          .concat(
            translateElements(
              0,
              0,
              complexSquare(y[0], y[1], schemaOptions).concat(
                schemaOptions.showDualityIndex.value
                  ? dualityIndexAnnotation(4 * i + 2)
                  : []
              )
            )
          )
          .concat(
            translateElements(
              800,
              0,
              complexSquare(z[0], z[1], schemaOptions).concat(
                schemaOptions.showDualityIndex.value
                  ? dualityIndexAnnotation(4 * i + 3)
                  : []
              )
            )
          )
          .concat(
            schemaOptions.showRectangularFactorizations.value !== 'ninguna'
              ? rectagularAnnotation(
                  ...rectagularAnnotationParams(
                    schemaOptions.showRectangularFactorizations.value
                  )
                )
              : []
          )
      )
    )
  // default list
  return dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      700 * i + ((i + 1) % 2) * 50,
      complexSquare(x, y, schemaOptions).concat(
        schemaOptions.showDualityIndex.value ? dualityIndexAnnotation(i) : []
      )
    )
  )
}
