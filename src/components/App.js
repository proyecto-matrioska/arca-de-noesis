import {
  Excalidraw,
  MainMenu,
  Sidebar,
  convertToExcalidrawElements,
} from '@excalidraw/excalidraw'
import './App.css'
import { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Editor from './Editor'
import FileSaver from 'file-saver'
import {
  capasDiscursivasSequence,
  complexOctagonSequence,
  complexSquareSequence,
  dialecticSequence,
  dualitySequence,
  empiricalComplexOctagonSequence,
  empiricalDialecticSequence,
  empiricalTripleSquareSequence,
  initialScreen,
  procesualSequence,
  squareSequence,
  tripletSquareSequence,
} from '../schemas/schemas'

import metafisicaData from '../examples/Metafísica de la información'
import intencionalidadData from '../examples/Intencionalidad.json'
import rosalindKraussData from '../examples/Rosalind Krauss.json'

const smallButtonClasses =
  'ExcButton ExcButton--color-primary ExcButton--variant-filled ExcButton--size-small'

function App() {
  const [data, setData] = useState([
    [
      ['', '', '', ''],
      ['', '', '', ''],
    ],
  ])
  const [dataFilename, setDataFilename] = useState('')
  const [excalidrawAPI, setExcalidrawAPI] = useState(null)
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDiagram, setSelectedDiagram] = useState(null)
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

  const handleFileUpload = e => {
    const { files } = e.target
    if (files && files.length) {
      const reader = new FileReader()
      reader.readAsText(files[0])
      reader.onload = () => {
        setDataFilename(files[0].name)
        setData(JSON.parse(reader.result))
        editarOptHandler()
      }
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
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/JSON;charset=utf-8',
    })
    FileSaver.saveAs(blob, input)
    setDataFilename(input)
  }
  const dualidadesOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(dualitySequence(data)),
      scrollToContent: true,
    })
    setSelectedDiagram('dualidades')
  }
  const cuadrosOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(squareSequence(data)),
      scrollToContent: true,
    })
    setSelectedDiagram('cuadros')
  }
  const cuadrosComplejosOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(complexSquareSequence(data)),
      scrollToContent: true,
    })
    setSelectedDiagram('cuadros-complejos')
  }
  const octagonosOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(complexOctagonSequence(data)),
      scrollToContent: true,
    })
    setSelectedDiagram('octagonos')
  }
  const octagonosEmpiricosOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(
        empiricalComplexOctagonSequence(data)
      ),
      scrollToContent: true,
    })
    setSelectedDiagram('octagonos-empiricos')
  }
  const triadasOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(tripletSquareSequence(data)),
      scrollToContent: true,
    })
    setSelectedDiagram('triadas')
  }
  const triadasEmpiricasOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(
        empiricalTripleSquareSequence(data)
      ),
      scrollToContent: true,
    })
    setSelectedDiagram('triadas-empiricas')
  }
  const dialecticaOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(dialecticSequence(data)),
      scrollToContent: true,
    })
    setSelectedDiagram('dialectica')
  }
  const dialecticaEmpíricaOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(empiricalDialecticSequence(data)),
      scrollToContent: true,
    })
    setSelectedDiagram('dialectica-empirica')
  }
  const procesualOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(procesualSequence(data)),
      scrollToContent: true,
    })
    setSelectedDiagram('procesual')
  }
  const capasDiscursivasOptHandler = () => {
    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(capasDiscursivasSequence(data)),
      scrollToContent: true,
    })
    setSelectedDiagram('capas-discursivas')
  }
  const editarOptHandler = () => {
    if (!isSidebarOpen) excalidrawAPI.toggleSidebar({ name: 'edit-sidebar' })
  }
  const loadExample = (filename, exampleData) => () => {
    setData(exampleData)
    setDataFilename(filename)
    editarOptHandler()
  }

  const dispatchUpdate = (update, index) => {
    const updatedData = [...data]
    updatedData[index] = update
    setData(updatedData)
  }

  const dispatchMoveUp = index => {
    if (index <= 0) return
    const updatedData = [...data]
    updatedData[index - 1] = data[index]
    updatedData[index] = data[index - 1]
    setData(updatedData)
  }

  const dispatchMoveDown = index => {
    if (index >= data.length - 1) return
    const updatedData = [...data]
    updatedData[index + 1] = data[index]
    updatedData[index] = data[index + 1]
    setData(updatedData)
  }

  const dispatchInsert = index => {
    if (data.length <= 0) {
      setData([
        [
          ['', '', '', ''],
          ['', '', '', ''],
        ],
      ])
      return
    }
    const updatedData = [
      ...data.slice(0, index + 1),
      [
        ['', '', '', ''],
        ['', '', '', ''],
      ],
      ...data.slice(index + 1),
    ]
    setData(updatedData)
  }

  const dispatchDelete = index => {
    if (data.length <= 1) {
      setData([
        [
          ['', '', '', ''],
          ['', '', '', ''],
        ],
      ])
      return
    }
    const updatedData =
      index === 0
        ? [...data.slice(1)]
        : [...data.slice(0, index), ...data.slice(index + 1)]
    setData(updatedData)
  }

  const dataChangeHandler = ({ action, data, index }) => {
    switch (action) {
      case 'update':
        dispatchUpdate(data, index)
        break
      case 'move-up':
        dispatchMoveUp(index)
        break
      case 'move-down':
        dispatchMoveDown(index)
        break
      case 'insert':
        dispatchInsert(index)
        break
      case 'delete':
        dispatchDelete(index)
        break
      default:
        break
    }
  }

  const updateScene = () => {
    switch (selectedDiagram) {
      case 'dualidades':
        dualidadesOptHandler()
        break
      case 'cuadros':
        cuadrosOptHandler()
        break
      case 'cuadros-complejos':
        cuadrosComplejosOptHandler()
        break
      case 'octagonos':
        octagonosOptHandler()
        break
      case 'octagonos-empiricos':
        octagonosEmpiricosOptHandler()
        break
      case 'triadas':
        triadasOptHandler()
        break
      case 'triadas-empiricas':
        triadasEmpiricasOptHandler()
        break
      case 'dialectica':
        dialecticaOptHandler()
        break
      case 'dialectica-empirica':
        dialecticaEmpíricaOptHandler()
        break
      case 'procesual':
        procesualOptHandler()
        break
      case 'capas-discursivas':
        capasDiscursivasOptHandler()
        break
      default:
        break
    }
  }

  return (
    <div className="App">
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
            <MainMenu.Item onSelect={dualidadesOptHandler}>
              Dualidades
            </MainMenu.Item>
            <MainMenu.Item onSelect={cuadrosOptHandler}>Cuadros</MainMenu.Item>
            <MainMenu.Item onSelect={cuadrosComplejosOptHandler}>
              Cuadros complejos
            </MainMenu.Item>
            <MainMenu.Item onSelect={octagonosOptHandler}>
              Octágonos
            </MainMenu.Item>
            <MainMenu.Item onSelect={octagonosEmpiricosOptHandler}>
              Octágonos empíricos
            </MainMenu.Item>
            <MainMenu.Item onSelect={triadasOptHandler}>Triadas</MainMenu.Item>
            <MainMenu.Item onSelect={triadasEmpiricasOptHandler}>
              Triadas empíricas
            </MainMenu.Item>
            <MainMenu.Item onSelect={dialecticaOptHandler}>
              Dialéctica
            </MainMenu.Item>
            <MainMenu.Item onSelect={dialecticaEmpíricaOptHandler}>
              Dialéctica empírica
            </MainMenu.Item>
            <MainMenu.Item onSelect={procesualOptHandler}>
              Procesual
            </MainMenu.Item>
            <MainMenu.Item onSelect={capasDiscursivasOptHandler}>
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
          onStateChange={e => setSidebarOpen(e !== null)}
        >
          <Sidebar.Header>
            <button
              type="button"
              className={smallButtonClasses}
              disabled={selectedDiagram === null}
              onClick={updateScene}
              title="Actualizar diagrama"
            >
              ⟲
            </button>
            {/* <button
              type="button"
              className={smallButtonClasses}
              disabled={selectedDiagram === null}
              onClick={() => {}}
              title="Anterior"
            >
              ◀
            </button>
            <button
              type="button"
              className={smallButtonClasses}
              disabled={selectedDiagram === null}
              onClick={() => {}}
              title="Siguiente"
            >
              ▶
            </button> */}
            <b>{dataFilename}</b>
          </Sidebar.Header>
          <Editor data={data} onChange={dataChangeHandler} />
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

export default App
