import { logo } from "./logo";
import { palette } from "./palette";


export const initialScreen = () => logo().concat([
  {
    type: 'text',
    x: 250,
    y: 500,
    textAlign: 'center',
    fontSize: 100,
    text: 'Arca de Noesis\n\n ',
    strokeColor: palette.DARK_GRAY,
  },
]);
