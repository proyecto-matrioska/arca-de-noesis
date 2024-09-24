import { palette } from './schemas'
import { complexSquare } from './squares'

export const complexOctagon = (s1, s2, [a, b, c, d]) =>
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
