import { SchemaElement } from '../schema'

/**
 * Creates an line element for a schema.
 * @param x Starting X position of the arrow
 * @param y Starting Y position of the arrow
 * @param width Width/horizontal displacement of the arrow
 * @param height Height/vertical displacement of the arrow
 * @param strokeColor Color of the arrow line
 * @param elementOptions Additional options for the element
 * @returns An line schema element
 */
export const lineElement = (
  x: number,
  y: number,
  width: number,
  height: number,
  strokeColor: string,
  elementOptions?: Record<string, any>
): SchemaElement => {
  return {
    type: 'line',
    x,
    y,
    width,
    height,
    strokeColor,
    ...(elementOptions ? elementOptions : {}),
  }
}
