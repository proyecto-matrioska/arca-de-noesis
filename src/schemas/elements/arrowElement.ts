import { SchemaElement } from '../schema'

/**
 * Creates an arrow element for a schema.
 * @param x Starting X position of the arrow
 * @param y Starting Y position of the arrow
 * @param width Width/horizontal displacement of the arrow
 * @param height Height/vertical displacement of the arrow
 * @param strokeColor Color of the arrow line
 * @param elementOptions Additional options for the element
 * @returns An arrow schema element
 */
export const arrowElement = (
  x: number,
  y: number,
  width: number,
  height: number,
  strokeColor: string,
  elementOptions?: Record<string, any> 
): SchemaElement => {
  return {
    type: 'arrow',
    x,
    y,
    width,
    height,
    strokeColor,
    ...(elementOptions ? elementOptions : {}),
  }
}
