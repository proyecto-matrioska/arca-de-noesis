import { Helmet } from 'react-helmet'
import ArcaDeNoesis from './ArcaDeNoesis'
import { useAppSelector } from '../state/store'
import { selectActiveTab } from '../state/dialecticsSlice'

function App() {
  const activeTab = useAppSelector(selectActiveTab)
  const filename = activeTab.filename
  const isDirty = activeTab.isDirty
  const windowTitle = `Arca de Noesis - ${filename ? filename : 'untitled'}${
    filename && filename.endsWith('.noesis') ? '' : '.noesis'
  }${isDirty ? ' (modificado)' : ''}`
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
