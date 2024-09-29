import { groupByTetrads } from './groupByTetrads'
import { groupByTriads } from './groupByTriads'
import { palette } from './palette'
import { translateElements } from './translateElements'

export const square = ([a, b, c, d]) => [
  {
    type: 'text',
    x: 0,
    y: 0,
    textAlign: 'center',
    fontSize: 28,
    text: c,
    strokeColor: palette.BLUE,
  },
  {
    type: 'text',
    x: 300,
    y: 0,
    textAlign: 'center',
    fontSize: 28,
    text: d,
    strokeColor: palette.RED,
  },
  {
    type: 'text',
    x: 300,
    y: 300,
    textAlign: 'center',
    fontSize: 28,
    text: a,
    strokeColor: palette.BLUE,
  },
  {
    type: 'text',
    x: 0,
    y: 300,
    textAlign: 'center',
    fontSize: 28,
    text: b,
    strokeColor: palette.RED,
  },
  {
    type: 'line',
    x: 60,
    y: 20,
    width: 180,
    strokeStyle: 'dotted',
    strokeColor: palette.LIGHT_BLUE,
  },
  {
    type: 'line',
    x: 60,
    y: 320,
    width: 180,
    strokeStyle: 'dotted',
    strokeColor: palette.LIGHT_BLUE,
  },
  {
    type: 'line',
    x: 0,
    y: 50,
    width: 1,
    height: 240,
    strokeStyle: 'dotted',
    strokeColor: palette.PURPLE,
  },
  {
    type: 'line',
    x: 300,
    y: 50,
    width: 1,
    height: 240,
    strokeStyle: 'dotted',
    strokeColor: palette.PURPLE,
  },
]

export const complexSquare = (s1, [a, b, c, d], schemaOptions) =>
  square(s1)
    .concat([
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
    .concat(
      schemaOptions.elementDescriptions.value
        ? complexSquareElementDescriptions()
        : []
    )

const squareElementDescriptions = () => [
  {
    type: 'text',
    x: 150,
    y: -100,
    textAlign: 'center',
    fontSize: 20,
    text: 'dualidad intensional/compleja',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 950,
    y: -100,
    textAlign: 'center',
    fontSize: 20,
    text: 'dualidad empírica/simple',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 150,
    y: 340,
    textAlign: 'center',
    fontSize: 20,
    text: 'eje intensional/complejo',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 150,
    y: -30,
    textAlign: 'center',
    fontSize: 20,
    text: 'eje empírico/simple',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 950,
    y: 340,
    textAlign: 'center',
    fontSize: 20,
    text: 'eje intensional/complejo',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 950,
    y: -30,
    textAlign: 'center',
    fontSize: 20,
    text: 'eje empírico/simple',
    strokeColor: palette.ORANGE,
  },
]

const complexSquareElementDescriptions = () => [
  {
    type: 'text',
    x: 150,
    y: 340,
    textAlign: 'center',
    fontSize: 20,
    text: 'eje intensional/complejo',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 150,
    y: -30,
    textAlign: 'center',
    fontSize: 20,
    text: 'eje empírico/simple',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 470,
    y: 160,
    textAlign: 'center',
    fontSize: 20,
    text: 'abstracción empírica',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'line',
    x: 170,
    y: 170,
    width: 180,
    height: 1,
    strokeStyle: 'dashed',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: -200,
    y: 60,
    textAlign: 'center',
    fontSize: 20,
    text: 'eje intensional/complejo',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'line',
    x: -70,
    y: 75,
    width: 110,
    height: 1,
    strokeStyle: 'dashed',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: -200,
    y: 260,
    textAlign: 'center',
    fontSize: 20,
    text: 'eje empírico/simple',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'line',
    x: -90,
    y: 275,
    width: 110,
    height: 1,
    strokeStyle: 'dashed',
    strokeColor: palette.ORANGE,
  },
]

export const squareSequence = (dualities, schemaOptions) =>
  dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      700 * i + ((i + 1) % 2) * 50,
      square(x)
        .concat(translateElements(800, 0, square(y)))
        .concat(
          schemaOptions.elementDescriptions.value
            ? squareElementDescriptions()
            : []
        )
    )
  )

export const complexSquareSequence = (dualities, schemaOptions) => {
  if (schemaOptions.arrangement.value === 'triadas')
    return groupByTriads(dualities).flatMap(([x, y, z], i) =>
      translateElements(
        0,
        1400 * i,
        translateElements(0, 500, complexSquare(x[0], x[1], schemaOptions))
          .concat(
            translateElements(
              800,
              500,
              complexSquare(y[0], y[1], schemaOptions)
            )
          )
          .concat(
            translateElements(400, 0, complexSquare(z[0], z[1], schemaOptions))
          )
      )
    )
  if (schemaOptions.arrangement.value === 'tetradas')
    return groupByTetrads(dualities).flatMap(([w, x, y, z], i) =>
      translateElements(
        0,
        1400 * i,
        translateElements(800, 500, complexSquare(w[0], w[1], schemaOptions))
          .concat(
            translateElements(0, 500, complexSquare(x[0], x[1], schemaOptions))
          )
          .concat(
            translateElements(0, 0, complexSquare(y[0], y[1], schemaOptions))
          )
          .concat(
            translateElements(800, 0, complexSquare(z[0], z[1], schemaOptions))
          )
      )
    )
  // default list
  return dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      700 * i + ((i + 1) % 2) * 50,
      complexSquare(x, y, schemaOptions)
    )
  )
}
