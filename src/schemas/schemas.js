import { dialecticLayers } from './layers'
import { duality } from './duals'
import { procesual } from './procesual'
import {
  empiricalTripleSquare,
  toEmpiricalTriples,
  toTriples,
  tripleSquare,
} from './triples'
import { complexSquare, square } from './squares'
import { complexOctagon } from './octagons'
import { dialectic } from './dialectics'
import { logo } from './logo'
import { palette } from './palette'
import { translateElements } from './translateElements'

const swapTetrads = ([x, y]) => [y, x]

export const initialScreen = () =>
  logo().concat([
    {
      type: 'text',
      x: 250,
      y: 500,
      textAlign: 'center',
      fontSize: 100,
      text: 'Arca de Noesis\n\n ',
      strokeColor: palette.DARK_GRAY,
    },
  ])

export const dualitySequence = dualities =>
  dualities.flatMap(([x, y], i) =>
    translateElements(0, 300 * i + ((i + 1) % 2) * 30, duality(x)).concat(
      translateElements(900, 300 * i + ((i + 1) % 2) * 30, duality(y))
    )
  )

export const squareSequence = dualities =>
  dualities.flatMap(([x, y], i) =>
    translateElements(0, 500 * i + ((i + 1) % 2) * 50, square(x)).concat(
      translateElements(600, 500 * i + ((i + 1) % 2) * 50, square(y))
    )
  )

export const complexSquareSequence = dualities =>
  dualities.flatMap(([x, y], i) =>
    translateElements(0, 500 * i + ((i + 1) % 2) * 50, complexSquare(x, y))
  )

export const complexOctagonSequence = dualities =>
  dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      800 * i + ((i + 1) % 2) * 100,
      dualities[i + 1]
        ? complexOctagon(x, y, dualities[i + 1][0])
        : complexSquare(x, y)
    )
  )

export const empiricalComplexOctagonSequence = dualities =>
  complexOctagonSequence(dualities.map(swapTetrads))

export const tripletSquareSequence = dualities =>
  dualities.flatMap(([a, b], i) =>
    translateElements(
      0,
      1000 * i,
      tripleSquare(
        ...toTriples(
          a,
          dualities[i + 1] ? dualities[i + 1][0] : ['', '', '', '']
        )
      ).concat(
        translateElements(
          1200,
          0,
          empiricalTripleSquare(...toEmpiricalTriples(a, b))
        )
      )
    )
  )

export const empiricalTripleSquareSequence = dualities =>
  tripletSquareSequence(dualities.map(swapTetrads))

export const dialecticSequence = dualities =>
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

export const empiricalDialecticSequence = dualities =>
  dialecticSequence(dualities.map(swapTetrads))

export const capasDiscursivasSequence = dualities =>
  dualities.flatMap(([x, a], i) => {
    const y = dualities[i + 1] ? dualities[i + 1][0] : ['', '', '', '']
    const z = dualities[i + 2] ? dualities[i + 2][0] : ['', '', '', '']
    const b = dualities[i + 1] ? dualities[i + 1][1] : ['', '', '', '']
    const c = dualities[i + 2] ? dualities[i + 2][1] : ['', '', '', '']
    return translateElements(
      0,
      600 * i,
      dialecticLayers([x[0], x[1]], [y[2], y[3]], [z[0], z[1]])
        .concat(
          translateElements(
            1000,
            0,
            dialecticLayers([x[2], x[3]], [y[0], y[1]], [z[2], z[3]])
          )
        )
        .concat(
          translateElements(
            2000,
            0,
            dialecticLayers([a[0], a[1]], [b[2], b[3]], [c[0], c[1]])
          )
        )
        .concat(
          translateElements(
            3000,
            0,
            dialecticLayers([a[2], a[3]], [b[0], b[1]], [c[2], c[3]])
          )
        )
    )
  })

export const procesualSequence = dualities =>
  dualities.flatMap(([x, a], i) => {
    const y = dualities[i + 1] ? dualities[i + 1][0] : ['', '', '', '']
    const z = dualities[i + 2] ? dualities[i + 2][0] : ['', '', '', '']
    const b = dualities[i + 1] ? dualities[i + 1][1] : ['', '', '', '']
    const c = dualities[i + 2] ? dualities[i + 2][1] : ['', '', '', '']
    return translateElements(
      0,
      400 * i,
      procesual(x[0], y[3], z[0])
        .concat(translateElements(800, 0, procesual(x[1], y[2], z[1])))
        .concat(translateElements(1600, 0, procesual(x[2], y[1], z[2])))
        .concat(translateElements(2400, 0, procesual(x[3], y[0], z[3])))
        .concat(translateElements(3200, 0, procesual(a[0], b[3], c[0])))
        .concat(translateElements(4000, 0, procesual(a[1], b[2], c[1])))
        .concat(translateElements(4800, 0, procesual(a[2], b[1], c[2])))
        .concat(translateElements(5600, 0, procesual(a[3], b[0], c[3])))
    )
  })
