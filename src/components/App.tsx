import { Helmet } from 'react-helmet'
import ArcaDeNoesis from './ArcaDeNoesis'
import { useAppSelector } from '../state/store'

function App() {
  const filename = useAppSelector(state => state.dialectics.filename)
  const isDirty = useAppSelector(state => state.dialectics.isDirty)
  const windowTitle = `Arca de Noesis - ${
    filename ? filename : 'untitled'
  }.noesis${isDirty ? ' (modificado)' : ''}`
  return (
    <>
      <Helmet>
        <title>{windowTitle}</title>
      </Helmet>
      <ArcaDeNoesis />
    </>
  )
}

export default App
