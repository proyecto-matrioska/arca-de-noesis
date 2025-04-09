import { Helmet } from 'react-helmet'
import ArcaDeNoesis from './ArcaDeNoesis'
import { useSelector } from 'react-redux'

function App() {
  const filename = useSelector(state => state.dialectics.filename)
  const windowTitle = `Arca de Noesis - ${filename ? filename : 'untitled'}.json`
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
