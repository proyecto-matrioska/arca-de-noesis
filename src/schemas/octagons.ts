import { palette } from "./palette"
import { swapTetrads } from './transformations/swapTetrads'
import { square } from './squares'
import { translateElements } from './transformations/translateElements'
import { groupByTetrads } from './transformations/groupByTetrads'
import { groupByTriads } from './transformations/groupByTriads'
import { DialecticsSchema, Schema } from './schema'
import { DualityData } from './schema'
import { SchemaOption } from '../state/uiOptions'
import { textElement } from './elements/textElement'
import { lineElement } from './elements/lineElement'

const complexSquare: (d1: DualityData, d2: DualityData) => Schema = (
  d1,
  [a, b, c, d]
) =>
  square(d1).concat([
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

export const complexOctagon: (
  d1: DualityData,
  d2: DualityData,
  d3: DualityData,
  schemaOptions: Record<string, SchemaOption>
) => Schema = (s1, s2, [a, b, c, d], _schemaOptions) =>
  complexSquare(s1, s2).concat([
    textElement(150, -150, c, 28, palette.BLUE, {
      textAlign: 'center',
    }),
    textElement(150, 450, d, 28, palette.RED, {
      textAlign: 'center',
    }),
    textElement(-150, 150, a, 28, palette.BLUE, {
      textAlign: 'center',
    }),
    textElement(450, 150, b, 28, palette.RED, {
      textAlign: 'center',
    }),
    lineElement(160, -110, 140, 110, palette.RED, {
      strokeStyle: 'dotted',
    }),
    lineElement(140, -110, -140, 110, palette.RED, {
      strokeStyle: 'dotted',
    }),
    lineElement(0, 340, 140, 110, palette.RED, {
      strokeStyle: 'dotted',
    }),
    lineElement(300, 340, -140, 110, palette.RED, {
      strokeStyle: 'dotted',
    }),
    lineElement(-150, 190, 120, 110, palette.RED, {
      strokeStyle: 'dotted',
    }),
    lineElement(-30, 40, -120, 110, palette.RED, {
      strokeStyle: 'dotted',
    }),
    lineElement(330, 40, 120, 110, palette.RED, {
      strokeStyle: 'dotted',
    }),
    lineElement(450, 190, -120, 110, palette.RED, {
      strokeStyle: 'dotted',
    }),
  ])

const dualityIndexAnnotation: (index: number) => Schema = index => [
  textElement(-100, -40, `${index + 1}:`, 20, palette.ORANGE, {
    textAlign: 'center',
  }),
]

export const complexOctagonSequence: DialecticsSchema = (
  dualities,
  schemaOptions
) => {
  if (schemaOptions.arrangement.value === 'triadas') {
    const triads = groupByTriads(dualities)
    return triads.flatMap(([x, y, z], i) =>
      translateElements(
        0,
        1400 * i,
        translateElements(
          0,
          500,
          complexOctagon(x[0], x[1], y[0], schemaOptions).concat(
            schemaOptions.showDualityIndex.value
              ? dualityIndexAnnotation(2 * i)
              : []
          )
        )
          .concat(
            translateElements(
              800,
              500,
              complexOctagon(y[0], y[1], z[0], schemaOptions).concat(
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
              complexOctagon(
                z[0],
                z[1],
                i + 1 < triads.length ? triads[i + 1][1][0] : ['', '', '', ''],
                schemaOptions
              ).concat(
                schemaOptions.showDualityIndex.value
                  ? dualityIndexAnnotation(2 * i + 2)
                  : []
              )
            )
          )
      )
    )
  }
  if (schemaOptions.arrangement.value === 'tetradas') {
    const tetrads = groupByTetrads(dualities)
    return tetrads.flatMap(([w, x, y, z], i) =>
      translateElements(
        0,
        1600 * i,
        translateElements(
          800,
          700,
          complexOctagon(w[0], w[1], x[0], schemaOptions).concat(
            schemaOptions.showDualityIndex.value
              ? dualityIndexAnnotation(4 * i)
              : []
          )
        )
          .concat(
            translateElements(
              0,
              700,
              complexOctagon(x[0], x[1], y[0], schemaOptions).concat(
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
              complexOctagon(y[0], y[1], z[0], schemaOptions).concat(
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
              complexOctagon(
                z[0],
                z[1],
                i + 1 < tetrads.length
                  ? tetrads[i + 1][0][0]
                  : ['', '', '', ''],
                schemaOptions
              ).concat(
                schemaOptions.showDualityIndex.value
                  ? dualityIndexAnnotation(4 * i + 3)
                  : []
              )
            )
          )
      )
    )
  }
  // default list
  return dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      800 * i + ((i + 1) % 2) * 100,
      dualities[i + 1]
        ? complexOctagon(x, y, dualities[i + 1][0], schemaOptions).concat(
            schemaOptions.showDualityIndex.value
              ? dualityIndexAnnotation(i)
              : []
          )
        : complexSquare(x, y).concat(
            schemaOptions.showDualityIndex.value
              ? dualityIndexAnnotation(i)
              : []
          )
    )
  )
}

export const empiricalComplexOctagonSequence: DialecticsSchema = (
  dualities,
  schemaOptions
) => complexOctagonSequence(dualities.map(swapTetrads), schemaOptions)
