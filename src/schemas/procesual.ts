import { DialecticsSchema, Schema } from './schema'
import { DualityData } from './schema'
import { palette } from './palette'
import { translateElements } from './transformations/translateElements'
import { arrowElement } from './elements/arrowElement'
import { textElement } from './elements/textElement'

export const procesual: (
  a: string,
  b: string,
  c: string,
  translations: (key: string) => string
) => Schema = (a, b, c, translations) => [
  arrowElement(20, 36, 100, 2, '#000000', {
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    roundness: { type: 2 },
    points: [
      [0, 0],
      [100, -2],
    ],
  }),
  arrowElement(20, 36, 100, 2, '#000000', {
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    roundness: { type: 2 },
    points: [
      [0, 0],
      [100, -2],
    ],
  }),
  arrowElement(310, 34, 80, 2, '#000000', {
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    roundness: { type: 2 },
    points: [
      [0, 0],
      [80, -2],
    ],
  }),
  arrowElement(209, 0, 285.49953544066193, 102.69200196919564, '#495057', {
    strokeWidth: 1,
    strokeStyle: 'dotted',
    roughness: 1,
    roundness: { type: 2 },
    points: [
      [0, 0],
      [-46.244368195602874, -91.51252148770118],
      [-256.6649589903427, -86.35769299206686],
      [-285.49953544066193, 11.179480481494465],
    ],
  }),
  arrowElement(480, 7, 254.97223619599026, 104.44872211944104, '#495057', {
    strokeWidth: 1,
    strokeStyle: 'dotted',
    roughness: 1,
    roundness: { type: 2 },
    points: [
      [0, 0],
      [-32.699477815163426, -99.39427669398287],
      [-232.1625505304255, -104.44872211944104],
      [-254.97223619599026, -1.6882998441242307],
    ],
  }),
  textElement(
    55,
    -125,
    translations('Schemas.Annotations.procesual.estructura'),
    20,
    palette.DARK_GRAY,
    {
      textAlign: 'center',
    }
  ),
  textElement(
    340,
    -135,
    translations('Schemas.Annotations.procesual.significa'),
    20,
    palette.DARK_GRAY,
    {
      textAlign: 'center',
    }
  ),
  textElement(
    60,
    45,
    translations('Schemas.Annotations.procesual.intenciona'),
    20,
    palette.DARK_GRAY,
    {
      textAlign: 'center',
    }
  ),
  textElement(
    350,
    45,
    translations('Schemas.Annotations.procesual.contextualiza'),
    20,
    palette.DARK_GRAY,
    {
      textAlign: 'center',
    }
  ),
  textElement(-60, 15, a, 28, palette.BLUE, {
    textAlign: 'center',
  }),
  textElement(220, 15, b, 28, palette.RED, {
    textAlign: 'center',
  }),
  textElement(480, 15, c, 28, palette.BLUE, {
    textAlign: 'center',
  }),
]
export const procesualSequence: DialecticsSchema = (
  dualities,
  schemaOptions,
  translations
) =>
  dualities.flatMap(([x, a], i) => {
    const y: DualityData = dualities[i + 1]
      ? dualities[i + 1][0]
      : ['', '', '', '']
    const z: DualityData = dualities[i + 2]
      ? dualities[i + 2][0]
      : ['', '', '', '']
    const b: DualityData = dualities[i + 1]
      ? dualities[i + 1][1]
      : ['', '', '', '']
    const c: DualityData = dualities[i + 2]
      ? dualities[i + 2][1]
      : ['', '', '', '']
    return translateElements(
      0,
      400 * i,
      procesual(x[0], y[3], z[0], translations)
        .concat(
          translateElements(800, 0, procesual(x[1], y[2], z[1], translations))
        )
        .concat(
          translateElements(1600, 0, procesual(x[2], y[1], z[2], translations))
        )
        .concat(
          translateElements(2400, 0, procesual(x[3], y[0], z[3], translations))
        )
        .concat(
          translateElements(3200, 0, procesual(a[0], b[3], c[0], translations))
        )
        .concat(
          translateElements(4000, 0, procesual(a[1], b[2], c[1], translations))
        )
        .concat(
          translateElements(4800, 0, procesual(a[2], b[1], c[2], translations))
        )
        .concat(
          translateElements(5600, 0, procesual(a[3], b[0], c[3], translations))
        )
    )
  })
