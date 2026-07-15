import { palette } from './palette'
import { translateElements } from './transformations/translateElements'
import { DialecticsSchema, Schema } from './schema'
import { textElement } from './elements/textElement'
import { arrowElement } from './elements/arrowElement'

export const dialecticLayers: (
  x: [string, string],
  y: [string, string],
  z: [string, string],
  translations: (key: string) => string
) => Schema = (x, y, z, translations) => [
  textElement(210, -40, `${x[0]} & ${x[1]}`, 28, palette.BLUE, {
    textAlign: 'right',
  }),
  textElement(440, 120, `${y[0]} & ${y[1]}`, 28, palette.RED, {
    textAlign: 'right',
  }),
  textElement(370, 280, `${z[0]} & ${z[1]}`, 28, palette.BLUE, {
    textAlign: 'left',
  }),
  textElement(
    140,
    30,
    `${translations(
      'Schemas.Annotations.layers.base-conceptual-1'
    )}\n${translations(
      'Schemas.Annotations.layers.base-conceptual-2'
    )}\n${translations('Schemas.Annotations.layers.base-conceptual-3')}`,
    20,
    palette.BLUE,
    {
      textAlign: 'center',
    }
  ),
  textElement(
    340,
    180,
    `${translations(
      'Schemas.Annotations.layers.base-técnica-1'
    )}\n${translations(
      'Schemas.Annotations.layers.base-técnica-2'
    )}\n${translations('Schemas.Annotations.layers.base-técnica-3')}`,
    20,
    palette.RED,
    {
      textAlign: 'center',
    }
  ),
  textElement(
    450,
    10,
    translations('Schemas.Annotations.layers.forma'),
    20,
    palette.RED,
    {
      textAlign: 'center',
    }
  ),
  textElement(
    650,
    150,
    translations('Schemas.Annotations.layers.informa'),
    20,
    palette.BLUE,
    {
      textAlign: 'center',
    }
  ),
  textElement(
    160,
    240,
    translations('Schemas.Annotations.layers.synthesizes'),
    20,
    palette.DARK_GRAY,
    {
      textAlign: 'center',
    }
  ),
  arrowElement(158, 3, 121.38490691041625, 108.47572347039363, '#000000', {
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    roundness: { type: 2 },
    startArrowhead: null,
    endArrowhead: 'arrow',
    points: [
      [0, 0],
      [121.38490691041625, 108.47572347039363],
    ],
  }),
  arrowElement(384, 115, -152.2550018727652, -133.3926394501566, '#000000', {
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    backgroundColor: 'transparent',
    frameId: null,
    roundness: { type: 2 },
    startArrowhead: null,
    endArrowhead: 'arrow',
    points: [
      [0, 0],
      [-57.15358663016109, -117.50115615822506],
      [-152.2550018727652, -133.3926394501566],
    ],
  }),
  arrowElement(364, 153, 114.75905855879137, 123.10651353551225, '#000000', {
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    roundness: { type: 2 },
    startArrowhead: null,
    endArrowhead: 'arrow',
    points: [
      [0, 0],
      [114.75905855879137, 123.10651353551225],
    ],
  }),
  arrowElement(572, 273, -110.34611664620388, -137.8073863741172, '#000000', {
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    roundness: { type: 2 },
    startArrowhead: null,
    endArrowhead: 'arrow',
    points: [
      [0, 0],
      [-46.62863580456451, -123.44620495655067],
      [-110.34611664620388, -137.8073863741172],
    ],
  }),
  arrowElement(0, 0, 341.3159907751724, 289.84831039501523, '#000000', {
    strokeStyle: 'solid',
    roughness: 1,
    roundness: { type: 2 },
    startArrowhead: 'arrow',
    endArrowhead: null,
    points: [
      [0, 0],
      [33.12497889105134, 239.8733172991421],
      [341.3159907751724, 289.84831039501523],
    ],
  }),
  arrowElement(215, 157, 126.77787705842348, 130.70935275899387, '#000000', {
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    roundness: { type: 2 },
    startArrowhead: 'arrow',
    endArrowhead: null,
    points: [
      [0, 0],
      [-0.4279554711491187, 98.76472039288974],
      [126.34992158727437, 130.70935275899387],
    ],
  }),
]

export const capasDiscursivasSequence: DialecticsSchema = (
  dualities,
  schemaOptions,
  translations
) =>
  dualities.flatMap(([x, a], i) => {
    const y = dualities[i + 1] ? dualities[i + 1][0] : ['', '', '', '']
    const z = dualities[i + 2] ? dualities[i + 2][0] : ['', '', '', '']
    const b = dualities[i + 1] ? dualities[i + 1][1] : ['', '', '', '']
    const c = dualities[i + 2] ? dualities[i + 2][1] : ['', '', '', '']
    const isOdd = i % 2 !== 0
    const rowNumber = Math.floor(i / 2)
    return translateElements(
      0,
      600 * rowNumber,
      translateElements(
        0 + (isOdd ? 1000 : 0),
        0,
        dialecticLayers([x[0], x[1]], [y[2], y[3]], [z[0], z[1]], translations)
      )
        .concat(
          translateElements(
            2000 + (isOdd ? 1000 : 0),
            0,
            dialecticLayers(
              [x[2], x[3]],
              [y[0], y[1]],
              [z[2], z[3]],
              translations
            )
          )
        )
        .concat(
          translateElements(
            4000 + (isOdd ? 1000 : 0),
            0,
            dialecticLayers(
              [a[0], a[1]],
              [b[2], b[3]],
              [c[0], c[1]],
              translations
            )
          )
        )
        .concat(
          translateElements(
            6000 + (isOdd ? 1000 : 0),
            0,
            dialecticLayers(
              [a[2], a[3]],
              [b[0], b[1]],
              [c[2], c[3]],
              translations
            )
          )
        )
    )
  })
