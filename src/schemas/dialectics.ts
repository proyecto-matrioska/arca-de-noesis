import { dual } from './duals'
import { translateElements } from './transformations/translateElements'
import { palette } from "./palette"
import { swapTetrads } from './transformations/swapTetrads'
import { DialecticsDataEntry, DialecticsSchema, Schema } from './schema'
import { textElement } from './elements/textElement'
import { arrowElement } from './elements/arrowElement'

export const dialectic: (
  a: string,
  b: string,
  c: string,
  d: string,
  e: string,
  f: string,
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
  d,
  e,
  f,
  {
    color1 = palette.BLUE,
    color2 = palette.RED,
    color3 = palette.RED,
    color4 = palette.BLUE,
    color5 = palette.BLUE,
    color6 = palette.RED,
  } = {}
) =>
  translateElements(0, 350, dual(a, b, { color3: color1, color4: color2 }))
    .concat(translateElements(400, 350, dual(c, d, { color3, color4 })))
    .concat(
      translateElements(200, 0, dual(e, f, { color3: color5, color4: color6 }))
    )
    .concat([
      arrowElement(240, 220, -90, 120, palette.DARK_GRAY),
      arrowElement(380, 220, 90, 120, palette.DARK_GRAY),
      arrowElement(240, 450, 140, 1, palette.DARK_GRAY, {
        startArrowhead: 'arrow',
      }),
      textElement(150, 250, 'sintetiza', 18, palette.DARK_GRAY),
      textElement(470, 250, 'sintetiza', 18, palette.DARK_GRAY),
      textElement(310, 460, 'se opone', 18, palette.DARK_GRAY),
    ])

export const dialecticSequence: (
  dualities: DialecticsDataEntry[]
) => Schema = dualities =>
  dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      800 * i + ((i + 1) % 2) * 100,
      dialectic(
        x[0],
        x[3],
        x[2],
        x[1],
        dualities[i + 1] ? dualities[i + 1][0][0] : '',
        dualities[i + 1] ? dualities[i + 1][0][1] : ''
      )
        .concat(
          translateElements(
            700,
            0,
            dialectic(
              x[0],
              x[1],
              x[2],
              x[3],
              dualities[i + 1] ? dualities[i + 1][0][2] : '',
              dualities[i + 1] ? dualities[i + 1][0][3] : '',
              {
                color1: palette.BLUE,
                color2: palette.BLUE,
                color3: palette.RED,
                color4: palette.RED,
                color5: palette.RED,
                color6: palette.BLUE,
              }
            )
          )
        )
        .concat(
          translateElements(
            1500,
            0,
            dialectic(x[0], x[2], x[2], x[0], y[0], y[1])
          )
        )
        .concat(
          translateElements(
            2200,
            0,
            dialectic(x[1], x[3], x[3], x[1], y[2], y[3], {
              color1: palette.BLUE,
              color2: palette.BLUE,
              color3: palette.RED,
              color4: palette.RED,
              color5: palette.RED,
              color6: palette.BLUE,
            })
          )
        )
    )
  )

export const empiricalDialecticSequence: DialecticsSchema = dualities =>
  dialecticSequence(dualities.map(swapTetrads))
