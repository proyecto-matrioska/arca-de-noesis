import { SchemaElement } from '../schema'
/**
 * Creates a text element for the schema.
 *
 * @param x - The x-coordinate of the text element.
 * @param y - The y-coordinate of the text element.
 * @param text - The text content of the element.
 * @param fontSize - The font size of the text.
 * @param strokeColor - The stroke color of the text.
 * @param elementOptions - Additional options for the text element.
 * @returns A SchemaElement representing the text element.
 */
export const textElement = (
  x: number,
  y: number,
  text: string,
  fontSize: number,
  strokeColor: string,
  elementOptions?: Record<string, any> 
): SchemaElement => {
  return {
    type: 'text',
    x,
    y,
    text,
    fontSize,
    strokeColor,
    textAlign: 'center',
    ...(elementOptions ? elementOptions : {}),
  }
}
