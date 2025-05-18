import { logo } from './logo'
import { palette } from "./palette"
import { Schema } from './schema'
import { textElement } from './elements/textElement'

/**
 * Creates the initial screen of the application
 * @returns Schema elements for the initial screen
 */
export const initialScreen: () => Schema = () =>
  logo().concat([
    textElement(250, 500, 'Arca de Noesis\n\n ', 100, palette.DARK_GRAY),
  ])
