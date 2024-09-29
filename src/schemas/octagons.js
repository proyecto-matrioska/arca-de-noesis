import { palette } from './palette'
import { swapTetrads } from './swapTetrads'
import { square } from './squares'
import { translateElements } from './translateElements'
import { groupByTetrads } from './groupByTetrads'
import { groupByTriads } from './groupByTriads'

const complexSquare = (s1, [a, b, c, d]) =>
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

export const complexOctagon = (s1, s2, [a, b, c, d], schemaOptions) =>
  complexSquare(s1, s2).concat([
    {
      type: 'text',
      x: 150,
      y: -150,
      textAlign: 'center',
      fontSize: 28,
      text: c,
      strokeColor: palette.BLUE,
    },
    {
      type: 'text',
      x: 150,
      y: 450,
      textAlign: 'center',
      fontSize: 28,
      text: d,
      strokeColor: palette.RED,
    },
    {
      type: 'text',
      x: -150,
      y: 150,
      textAlign: 'center',
      fontSize: 28,
      text: a,
      strokeColor: palette.BLUE,
    },
    {
      type: 'text',
      x: 450,
      y: 150,
      textAlign: 'center',
      fontSize: 28,
      text: b,
      strokeColor: palette.RED,
    },
    {
      type: 'line',
      x: 160,
      y: -110,
      width: 140,
      height: 110,
      strokeStyle: 'dotted',
      strokeColor: palette.RED,
    },
    {
      type: 'line',
      x: 140,
      y: -110,
      width: -140,
      height: 110,
      strokeStyle: 'dotted',
      strokeColor: palette.RED,
    },
    {
      type: 'line',
      x: 0,
      y: 340,
      width: 140,
      height: 110,
      strokeStyle: 'dotted',
      strokeColor: palette.RED,
    },
    {
      type: 'line',
      x: 300,
      y: 340,
      width: -140,
      height: 110,
      strokeStyle: 'dotted',
      strokeColor: palette.RED,
    },
    {
      type: 'line',
      x: -150,
      y: 190,
      width: 120,
      height: 110,
      strokeStyle: 'dotted',
      strokeColor: palette.RED,
    },
    {
      type: 'line',
      x: -30,
      y: 40,
      width: -120,
      height: 110,
      strokeStyle: 'dotted',
      strokeColor: palette.RED,
    },
    {
      type: 'line',
      x: 330,
      y: 40,
      width: 120,
      height: 110,
      strokeStyle: 'dotted',
      strokeColor: palette.RED,
    },
    {
      type: 'line',
      x: 450,
      y: 190,
      width: -120,
      height: 110,
      strokeStyle: 'dotted',
      strokeColor: palette.RED,
    },
  ])

export const complexOctagonSequence = (dualities, schemaOptions) => {
  if (schemaOptions.arrangement.value === 'triadas') {
    const triads = groupByTriads(dualities)
    return triads.flatMap(([x, y, z], i) =>
      translateElements(
        0,
        1400 * i,
        translateElements(
          0,
          500,
          complexOctagon(x[0], x[1], y[0], schemaOptions)
        )
          .concat(
            translateElements(
              800,
              500,
              complexOctagon(y[0], y[1], z[0], schemaOptions)
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
          complexOctagon(w[0], w[1], x[0], schemaOptions)
        )
          .concat(
            translateElements(
              0,
              700,
              complexOctagon(x[0], x[1], y[0], schemaOptions)
            )
          )
          .concat(
            translateElements(
              0,
              0,
              complexOctagon(y[0], y[1], z[0], schemaOptions)
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
        ? complexOctagon(x, y, dualities[i + 1][0], schemaOptions)
        : complexSquare(x, y)
    )
  )
}
/* dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      800 * i + ((i + 1) % 2) * 100,
      dualities[i + 1]
        ? complexOctagon(x, y, dualities[i + 1][0], schemaOptions)
        : complexSquare(x, y)
    )
  ) */

export const empiricalComplexOctagonSequence = (dualities, schemaOptions) =>
  complexOctagonSequence(dualities.map(swapTetrads), schemaOptions)
