import { SchemaElement } from '../schema'

/**
 * Creates an ellipse element for a schema.
 * @param x Starting X position of the arrow
 * @param y Starting Y position of the arrow
 * @param width Width/horizontal size of the ellipse
 * @param height Height/vertical size of the ellipse
 * @param color Color of the ellipse line
 * @param elementOptions Additional options for the element
 * @returns An ellipse schema element
 */
export const ellipseElement = (
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  elementOptions?: Record<string, any>
): SchemaElement => {
  return {
    type: 'ellipse',
    x,
    y,
    width,
    height,
    strokeColor: color,
    ...(elementOptions ? elementOptions : {}),
  }
}
