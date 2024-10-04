import { useRef, useState } from 'react'
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
  saveDataFile,
  setDialecticsData,
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

import metafisicaData from '../examples/Metafísica de la información'
import intencionalidadData from '../examples/Intencionalidad.json'
import rosalindKraussData from '../examples/Rosalind Krauss.json'

const smallButtonClasses =
  'ExcButton ExcButton--color-primary ExcButton--variant-filled ExcButton--size-small'

function ArcaDeNoesis() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.dialectics.data)
  const dataFilename = useSelector(state => state.dialectics.filename)
  const [excalidrawAPI, setExcalidrawAPI] = useState(null)
  const isSidebarOpen = useSelector(state => state.ui.isSidebarOpen)
  const selectedDiagram = useSelector(state => state.ui.selectedDiagram)
  const schemaOptions = useSelector(state => state.ui.schemaOptions)
  const generalSchemaOptions = useSelector(
    state => state.ui.generalSchemaOptions
  )
  const inputFile = useRef(null)
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

  const openEditorTab = () => {
    if (!isSidebarOpen)
      excalidrawAPI.toggleSidebar({ name: 'edit-sidebar', tab: 'dataEditor' })
  }
  const openOptionsTab = () => {
    if (!isSidebarOpen)
      excalidrawAPI.toggleSidebar({
        name: 'edit-sidebar',
        tab: 'diagramOptions',
      })
  }
  const updateScene = elements => {
    excalidrawAPI.updateScene({
      elements,
      scrollToContent: true,
    })
  }
  const handleFileUpload = e => {
    const { files } = e.target
    if (files && files.length) {
      dispatch(loadDataFile(files[0]))
      editarOptHandler()
    }
  }
  const loadFileOptHandler = () => {
    //if (window.confirm('Se perderán los cambios no guardados. ¿Continuar?'))
    inputFile.current.click()
  }
  const saveFileOptHandler = () => {
    const input = window.prompt('Guardar en', dataFilename ?? '')
    if (input === '') {
      window.alert('Especifique un nombre de archivo')
      return
    }
    dispatch(saveDataFile(input, data))
  }
  const selectDiagramHandler = schema => () => {
    const factorizationId = generalSchemaOptions.factorizations.value
    let makeElements = null
    switch (schema) {
      case 'dualidades':
        makeElements = dualitySequence
        break
      case 'cuadros':
        makeElements = squareSequence
        break
      case 'cuadros-complejos':
        makeElements = complexSquareSequence
        break
      case 'octagonos':
        makeElements = complexOctagonSequence
        break
      case 'octagonos-empiricos':
        makeElements = empiricalComplexOctagonSequence
        break
      case 'triadas':
        makeElements = tripleSquareSequence
        break
      case 'triadas-empiricas':
        makeElements = empiricalTripleSquareSequence
        break
      case 'dialectica':
        makeElements = dialecticSequence
        break
      case 'dialectica-empirica':
        makeElements = empiricalDialecticSequence
        break
      case 'procesual':
        makeElements = procesualSequence
        break
      case 'capas-discursivas':
        makeElements = capasDiscursivasSequence
        break
      default:
        break
    }
    const elements = convertToExcalidrawElements(
      makeElements(factorData(factorizationId, data), schemaOptions[schema])
    )
    updateScene(elements)
    dispatch(setSelectedDiagram(schema))
    openOptionsTab()
  }
  const editarOptHandler = () => {
    openEditorTab()
  }
  const loadExample = (filename, exampleData) => () => {
    dispatch(setDialecticsData({ filename, data: exampleData }))
    editarOptHandler()
  }

  const updateDiagram = () => {
    selectDiagramHandler(selectedDiagram)()
  }

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
            <MainMenu.Item onSelect={saveFileOptHandler}>
              Guardar...
            </MainMenu.Item>
            <MainMenu.Item onSelect={editarOptHandler}>Editar</MainMenu.Item>
          </MainMenu.Group>
          <MainMenu.Group title="Ejemplos">
            <MainMenu.Item
              onSelect={loadExample(
                'Metafísica de la información.json',
                metafisicaData
              )}
            >
              Metafísica de la información
            </MainMenu.Item>
            <MainMenu.Item
              onSelect={loadExample(
                'Intencionalidad.json',
                intencionalidadData
              )}
            >
              Intención vs intensión
            </MainMenu.Item>
            <MainMenu.Item
              onSelect={loadExample('Rosalind Krauss.json', rosalindKraussData)}
            >
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
            <MainMenu.Item onSelect={selectDiagramHandler('dualidades')}>
              Dualidades
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectDiagramHandler('cuadros')}>
              Cuadros
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectDiagramHandler('cuadros-complejos')}>
              Cuadros complejos
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectDiagramHandler('octagonos')}>
              Octágonos
            </MainMenu.Item>
            <MainMenu.Item
              onSelect={selectDiagramHandler('octagonos-empiricos')}
            >
              Octágonos empíricos
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectDiagramHandler('triadas')}>
              Triadas
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectDiagramHandler('triadas-empiricas')}>
              Triadas empíricas
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectDiagramHandler('dialectica')}>
              Dialéctica
            </MainMenu.Item>
            <MainMenu.Item
              onSelect={selectDiagramHandler('dialectica-empirica')}
            >
              Dialéctica empírica
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectDiagramHandler('procesual')}>
              Procesual
            </MainMenu.Item>
            <MainMenu.Item onSelect={selectDiagramHandler('capas-discursivas')}>
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
      <input
        style={{ display: 'none' }}
        accept="application/JSON"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
    </div>
  )
}

export default ArcaDeNoesis
