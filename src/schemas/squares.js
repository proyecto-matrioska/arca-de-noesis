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

const rectagularAnnotation = (a, b, c, d) => [
  {
    type: 'ellipse',
    strokeWidth: 2,
    strokeStyle: 'dashed',
    x: a === 0 || a === 3 ? -80 : 220,
    y: a > 1 ? 260 : -40,
    strokeColor: palette.ORANGE,
    backgroundColor: 'transparent',
    width: 160,
    height: 120,
  },
  {
    type: 'ellipse',
    strokeWidth: 2,
    strokeStyle: 'dashed',
    x: b === 0 || b === 3 ? 720 : 1020,
    y: b > 1 ? 260 : -40,
    strokeColor: palette.ORANGE,
    backgroundColor: 'transparent',
    width: 160,
    height: 120,
  },
  {
    type: 'ellipse',
    strokeWidth: 2,
    strokeStyle: 'dashed',
    x: c === 0 || c === 3 ? 720 : 1020,
    y: c > 1 ? 760 : 460,
    strokeColor: palette.ORANGE,
    backgroundColor: 'transparent',
    width: 160,
    height: 120,
  },
  {
    type: 'ellipse',
    strokeWidth: 2,
    strokeStyle: 'dashed',
    x: d === 0 || d === 3 ? -80 : 220,
    y: d > 1 ? 760 : 460,
    strokeColor: palette.ORANGE,
    backgroundColor: 'transparent',
    width: 160,
    height: 120,
  },
  {
    type: 'line',
    strokeWidth: 2,
    strokeStyle: 'dashed',
    x: a === 0 || a === 3 ? 80 : 380,
    y: a > 1 ? 320 : 20,
    strokeColor: palette.ORANGE,
    backgroundColor: 'transparent',
    width:
      340 + ([1, 2].includes(a) ? 0 : 300) + ([1, 2].includes(b) ? 300 : 0),
    height: a <= 1 && b >= 2 ? 300 : a > 1 && b < 2 ? -300 : 0,
  },
  {
    type: 'line',
    strokeWidth: 2,
    strokeStyle: 'dashed',
    x: d === 0 || d === 3 ? 80 : 380,
    y: d > 1 ? 820 : 520,
    strokeColor: palette.ORANGE,
    width:
      340 + ([1, 2].includes(d) ? 0 : 300) + ([1, 2].includes(c) ? 300 : 0),
    height: d <= 1 && c >= 2 ? 300 : d > 1 && c < 2 ? -300 : 0,
  },
  {
    type: 'line',
    strokeWidth: 2,
    strokeStyle: 'dashed',
    x: b === 0 || b === 3 ? 800 : 1100,
    y: b > 1 ? 380 : 80,
    strokeColor: palette.ORANGE,
    width:
      [0, 3].includes(b) && [1, 2].includes(c)
        ? 300
        : [1, 2].includes(b) && [0, 3].includes(c)
        ? -300
        : 1,
    height:
      [2, 3].includes(b) && [0, 1].includes(c)
        ? 80
        : [0, 1].includes(b) && [2, 3].includes(c)
        ? 680
        : 380,
  },
  {
    type: 'line',
    strokeWidth: 2,
    strokeStyle: 'dashed',
    x: a === 0 || a === 3 ? 0 : 300,
    y: a > 1 ? 380 : 80,
    strokeColor: palette.ORANGE,
    width:
      [0, 3].includes(a) && [1, 2].includes(d)
        ? 300
        : [1, 2].includes(a) && [0, 3].includes(d)
        ? -300
        : 1,
    height:
      [2, 3].includes(a) && [0, 1].includes(d)
        ? 80
        : [0, 1].includes(a) && [2, 3].includes(d)
        ? 680
        : 380,
  },
]

const rectagularAnnotationParams = name => {
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
        return [1,0,1,0]
      case 'trapecial-2':
        return [2,3,2,3]
      case 'trapecial-3':
        return [0,1,0,1]
      case 'trapecial-4':
        return [3,2,3,2]
      case 'trapecial-5':
        return [0,3,0,3]
      case 'trapecial-6':
        return [1,2,1,2]
      case 'trapecial-7':
        return [3,0,3,0]
      case 'trapecial-8':
        return [2,1,2,1]
      case 'trapecial-9':
        return [1,3,0,2]
      case 'trapecial-10':
        return [2,0,3,1]
    default:
      return [0, 0, 0, 0]
  }
}

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
      complexSquare(x, y, schemaOptions)
    )
  )
}
