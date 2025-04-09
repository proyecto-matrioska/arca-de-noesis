import { useCallback, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import {
  Excalidraw,
  MainMenu,
  Sidebar,
  convertToExcalidrawElements,
} from '@excalidraw/excalidraw'
import './ArcaDeNoesis.css'
import Editor from './Editor'
import OptionsPanel from './OptionsPanel'
import {
  loadDataFile,
  loadExample,
  saveAsDataFile,
  saveDataFile,
} from '../state/dialecticsSlice'
import { setSelectedDiagram, setSidebarOpen } from '../state/uiSlice'
import { factorData } from '../schemas/factorization'
import { initialScreen } from '../schemas/initialScreen'
import { dualitySequence } from '../schemas/duals'
import { squareSequence, complexSquareSequence } from '../schemas/squares'
import {
  complexOctagonSequence,
  empiricalComplexOctagonSequence,
} from '../schemas/octagons'
import {
  tripleSquareSequence,
  empiricalTripleSquareSequence,
} from '../schemas/triples'
import {
  dialecticSequence,
  empiricalDialecticSequence,
} from '../schemas/dialectics'
import { procesualSequence } from '../schemas/procesual'
import { capasDiscursivasSequence } from '../schemas/layers'

const smallButtonClasses =
  'ExcButton ExcButton--color-primary ExcButton--variant-filled ExcButton--size-small'

function ArcaDeNoesis() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.dialectics.data)
  const dataFilename = useSelector(state => state.dialectics.filename)
  const isDirty = useSelector(state => state.dialectics.isDirty)
  const [excalidrawAPI, setExcalidrawAPI] = useState(null)
  const isSidebarOpen = useSelector(state => state.ui.isSidebarOpen)
  const selectedDiagram = useSelector(state => state.ui.selectedDiagram)
  const schemaOptions = useSelector(state => state.ui.schemaOptions)
  const diagramAutoupdate = useSelector(
    state => state.ui.generalSchemaOptions.diagramAutoupdate
  )
  const generalSchemaOptions = useSelector(
    state => state.ui.generalSchemaOptions
  )
  const defaultDarkMode = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined,
    isSystemDark =>
      excalidrawAPI.updateScene({
        appState: {
          viewBackgroundColor: isSystemDark ? '#e8e8e8' : '#fcf5e4',
        },
      })
  )
  const initialElements = convertToExcalidrawElements(initialScreen())
  const elements = initialElements
  const hasFileSystemAccessAPI = 'showSaveFilePicker' in window

  const openEditorTab = () => {
    if (!isSidebarOpen)
      excalidrawAPI.toggleSidebar({ name: 'edit-sidebar', tab: 'dataEditor' })
  }
  const loadFileOptHandler = async () => {
    if (isDirty && !window.confirm('¿Perder los cambios no guardados?')) return

    dispatch(loadDataFile())
    editarOptHandler()
  }
  const saveFileOptHandler = () => {
    dispatch(saveDataFile())
  }
  const saveAsFileOptHandler = () => {
    dispatch(saveAsDataFile())
  }
  const selectSchemaHandler = schema => () => {
    dispatch(setSelectedDiagram(schema))
  }
  const editarOptHandler = () => {
    openEditorTab()
  }
  const loadExampleHandler = exampleName => () => {
    if (isDirty && !window.confirm('¿Perder los cambios no guardados?')) return
    dispatch(loadExample(exampleName))
    editarOptHandler()
  }

  const updateDiagram = useCallback(() => {
    const factorizationId = generalSchemaOptions.factorizations.value
    let maker = null
    switch (selectedDiagram) {
      case 'dualidades':
        maker = dualitySequence
        break
      case 'cuadros':
        maker = squareSequence
        break
      case 'cuadros-complejos':
        maker = complexSquareSequence
        break
      case 'octagonos':
        maker = complexOctagonSequence
        break
      case 'octagonos-empiricos':
        maker = empiricalComplexOctagonSequence
        break
      case 'triadas':
        maker = tripleSquareSequence
        break
      case 'triadas-empiricas':
        maker = empiricalTripleSquareSequence
        break
      case 'dialectica':
        maker = dialecticSequence
        break
      case 'dialectica-empirica':
        maker = empiricalDialecticSequence
        break
      case 'procesual':
        maker = procesualSequence
        break
      case 'capas-discursivas':
        maker = capasDiscursivasSequence
        break
      default:
        break
    }
    const elements = convertToExcalidrawElements(
      maker(factorData(factorizationId, data), schemaOptions[selectedDiagram])
    )
    excalidrawAPI.updateScene({
      elements,
      scrollToContent: true,
    })
  }, [
    data,
    excalidrawAPI,
    generalSchemaOptions.factorizations.value,
    isSidebarOpen,
    schemaOptions,
    selectedDiagram,
  ])

  useEffect(() => {
    const handleBeforeUnload = e => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  useEffect(() => {
    if (selectedDiagram) updateDiagram()
  }, [selectedDiagram, updateDiagram])

  useEffect(() => {
    if (diagramAutoupdate && selectedDiagram) updateDiagram()
    return () => {}
  }, [data, diagramAutoupdate, selectedDiagram, updateDiagram])

  return (
    <div className="ArcaDeNoesis">
      <Excalidraw
        UIOptions={{
          dockedSidebarBreakpoint: 0,
        }}
        initialData={{
          elements,
          appState: {
            viewBackgroundColor: defaultDarkMode ? '#e8e8e8' : '#fcf5e4',
            viewModeEnabled: true,
            //zenModeEnabled: true,
            zoom: 0.5,
          },
          scrollToContent: true,
        }}
        gridModeEnabled={true}
        //viewModeEnabled={true}
        //zenModeEnabled={true}
        theme={defaultDarkMode ? 'dark' : 'light'}
        excalidrawAPI={api => setExcalidrawAPI(api)}
      >
        <MainMenu>
          <MainMenu.Group title="Datos">
            <MainMenu.Item onSelect={loadFileOptHandler}>
              Cargar...
            </MainMenu.Item>
            <MainMenu.Item onSelect={saveFileOptHandler}>Guardar</MainMenu.Item>
            {hasFileSystemAccessAPI && (
              <MainMenu.Item onSelect={saveAsFileOptHandler}>
                Guardar como...
              </MainMenu.Item>
            )}
            <MainMenu.Item onSelect={editarOptHandler}>Editar</MainMenu.Item>
          </MainMenu.Group>
          <MainMenu.Group title="Ejemplos">
            <MainMenu.Item onSelect={loadExampleHandler('metafisica')}>
              Metafísica de la información
            </MainMenu.Item>
            <MainMenu.Item onSelect={loadExampleHandler('intensionalidad')}>
              Intención vs intensión
            </MainMenu.Item>
            <MainMenu.Item onSelect={loadExampleHandler('rosalindKrauss')}>
              Rosalind Krauss - Espacio y arquitectura
            </MainMenu.Item>
          </MainMenu.Group>
          <MainMenu.Separator />
          <MainMenu.Group title="Diagrama actual">
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.SaveAsImage />
          </MainMenu.Group>
          <MainMenu.Separator />
          <MainMenu.Group title="Galería de esquemas">
            <MainMenu.Item onSelect={selectSchemaHandler('dualidades')}>
              Dualidades
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectSchemaHandler('cuadros')}>
              Cuadros
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectSchemaHandler('cuadros-complejos')}>
              Cuadros complejos
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectSchemaHandler('octagonos')}>
              Octágonos
            </MainMenu.Item>
            <MainMenu.Item
              onSelect={selectSchemaHandler('octagonos-empiricos')}
            >
              Octágonos empíricos
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectSchemaHandler('triadas')}>
              Triadas
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectSchemaHandler('triadas-empiricas')}>
              Triadas empíricas
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectSchemaHandler('dialectica')}>
              Dialéctica
            </MainMenu.Item>
            <MainMenu.Item
              onSelect={selectSchemaHandler('dialectica-empirica')}
            >
              Dialéctica empírica
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectSchemaHandler('procesual')}>
              Procesual
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectSchemaHandler('capas-discursivas')}>
              Capas discursivas
            </MainMenu.Item>
          </MainMenu.Group>
          <MainMenu.Group title="Acerca de">
            <MainMenu.ItemLink href="https://proyecto-matrioska.github.io/notas/Proyecto%20Matrioska/">
              Proyecto Matrioska
            </MainMenu.ItemLink>
          </MainMenu.Group>
        </MainMenu>
        <Sidebar
          name="edit-sidebar"
          docked={true}
          onStateChange={e => dispatch(setSidebarOpen(e !== null))}
        >
          <Sidebar.Header>
            <button
              type="button"
              className={smallButtonClasses}
              disabled={selectedDiagram === null}
              onClick={updateDiagram}
              title="Actualizar diagrama"
            >
              ⟲
            </button>
            <b>{dataFilename}</b>
            {isDirty && <span className="unsavedDataMark">🖫</span>}
          </Sidebar.Header>
          <Sidebar.Tabs>
            <Sidebar.Tab tab="dataEditor">
              <Editor />
            </Sidebar.Tab>
            <Sidebar.Tab tab="diagramOptions">
              <OptionsPanel />
            </Sidebar.Tab>
            <Sidebar.TabTriggers>
              <Sidebar.TabTrigger tab="dataEditor">Datos</Sidebar.TabTrigger>
              <Sidebar.TabTrigger tab="diagramOptions">
                Esquema
              </Sidebar.TabTrigger>
            </Sidebar.TabTriggers>
          </Sidebar.Tabs>
        </Sidebar>
      </Excalidraw>
    </div>
  )
}

export default ArcaDeNoesis
