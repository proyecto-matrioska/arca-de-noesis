import { ellipseElement } from './elements/ellpiseElement'
import { palette } from "./palette"
import { Schema } from './schema'

export const logo: () => Schema = () => [
  ellipseElement(0, 240, 217, 217, palette.BLUE, {
    backgroundColor: palette.BLUE,
    fillStyle: 'solid',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 0,
    opacity: 100,
  }),
  ellipseElement(281, 240, 217, 217, palette.RED, {
    backgroundColor: palette.RED,
    fillStyle: 'solid',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 0,
    opacity: 100,
  }),
  ellipseElement(140, 0, 217, 217, palette.BLUE, {
    backgroundColor: palette.BLUE,
    fillStyle: 'solid',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 0,
    opacity: 100,
  }),
  ellipseElement(180, 63, 137, 137, palette.RED, {
    backgroundColor: palette.RED,
    fillStyle: 'solid',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 0,
    opacity: 100,
  }),
]
