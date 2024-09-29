import { translateElements } from './translateElements'
import { palette } from './palette'

export const dual = (
  a,
  b,
  {
    color1 = palette.BLUE,
    color2 = palette.RED,
    color3 = palette.BLUE,
    color4 = palette.RED,
  } = {}
) => [
  {
    type: 'text',
    x: 108,
    y: 24,
    textAlign: 'center',
    fontSize: 28,
    text: a,
    strokeColor: color1,
  },
  {
    type: 'text',
    x: 108,
    y: 110,
    textAlign: 'center',
    fontSize: 28,
    text: b,
    strokeColor: color2,
  },
  {
    type: 'ellipse',
    strokeColor: color3,
    x: 0,
    y: 0,
    width: 217,
    height: 217,
  },
  {
    type: 'ellipse',
    strokeColor: color4,
    x: 27,
    y: 62,
    width: 163,
    height: 137,
  },
]

export const duality = ([a, b, c, d]) =>
  dual(a, b).concat(
    translateElements(
      300,
      0,
      dual(c, d, { color3: palette.RED, color4: palette.BLUE })
    )
  )

const elementDescriptions = () => [
  {
    type: 'text',
    x: 250,
    y: -80,
    textAlign: 'center',
    fontSize: 20,
    text: 'dualidad intensional/compleja',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 1150,
    y: -80,
    textAlign: 'center',
    fontSize: 20,
    text: 'dualidad empírica/simple',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 100,
    y: -40,
    textAlign: 'center',
    fontSize: 20,
    text: 'dual intensional/complejo',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 400,
    y: -40,
    textAlign: 'center',
    fontSize: 20,
    text: 'dual empírico/simple',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 1000,
    y: -40,
    textAlign: 'center',
    fontSize: 20,
    text: 'dual intensional/complejo',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 1300,
    y: -40,
    textAlign: 'center',
    fontSize: 20,
    text: 'dual empírico/simple',
    strokeColor: palette.ORANGE,
  },
]

const intensionFormContext = isEven => [
  {
    type: 'text',
    x: -20,
    y: 30,
    textAlign: 'right',
    fontSize: 20,
    text: isEven ? 'intensión' : 'contexto',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: -20,
    y: 120,
    textAlign: 'right',
    fontSize: 20,
    text: isEven ? 'extensión' : 'sentido',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 540,
    y: 30,
    textAlign: 'left',
    fontSize: 20,
    text: isEven ? 'esencia' : 'informa',
    strokeColor: palette.ORANGE,
  },
  {
    type: 'text',
    x: 540,
    y: 120,
    textAlign: 'left',
    fontSize: 20,
    text: isEven ? 'sustancia' : 'forma',
    strokeColor: palette.ORANGE,
  },
]

export const dualitySequence = (dualities, schemaOptions) =>
  dualities.flatMap(([x, y], i) =>
    translateElements(
      0,
      400 * i + ((i + 1) % 2) * 30,
      duality(x)
        .concat(translateElements(900, 0, duality(y)))
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
