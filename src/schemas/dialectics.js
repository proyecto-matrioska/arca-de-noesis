import { dual } from './duals'
import { translateElements } from './translateElements'
import { palette } from './palette'
import { swapTetrads } from './swapTetrads'

export const dialectic = (
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
      {
        type: 'arrow',
        x: 240,
        y: 220,
        width: -90,
        height: 120,
        strokeColor: palette.DARK_GRAY,
      },
      {
        type: 'arrow',
        x: 380,
        y: 220,
        width: 90,
        height: 120,
        strokeColor: palette.DARK_GRAY,
      },
      {
        type: 'arrow',
        x: 240,
        y: 450,
        width: 140,
        height: 1,
        strokeColor: palette.DARK_GRAY,
        startArrowhead: 'arrow',
      },
      {
        type: 'text',
        x: 150,
        y: 250,
        textAlign: 'center',
        fontSize: 18,
        text: 'sintetiza',
        strokeColor: palette.DARK_GRAY,
      },
      {
        type: 'text',
        x: 470,
        y: 250,
        textAlign: 'center',
        fontSize: 18,
        text: 'sintetiza',
        strokeColor: palette.DARK_GRAY,
      },
      {
        type: 'text',
        x: 310,
        y: 460,
        textAlign: 'center',
        fontSize: 18,
        text: 'se opone',
        strokeColor: palette.DARK_GRAY,
      },
    ])

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
