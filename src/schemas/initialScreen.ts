import { ExcalidrawElementSkeleton } from '@excalidraw/excalidraw/dist/types/excalidraw/data/transform'
import { logo } from './logo'
import { palette } from './palette'

export const initialScreen: () => ExcalidrawElementSkeleton[] = () =>
  logo().concat([
    {
      type: 'text',
      x: 250,
      y: 500,
      textAlign: 'center',
      fontSize: 100,
      text: 'Arca de Noesis\n\n ',
      strokeColor: palette.DARK_GRAY,
    },
  ])
