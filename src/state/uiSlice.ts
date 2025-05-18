import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SchemaIdentifier } from '../schemas/schema'

export type SchemaOption = {
  type: string
  name: string
  value: any
  longDescription: string
  options?: Array<{ value: string; name: string }>
  depends?: { element: string; value: string }
}

export type SchemaOptions = {
  [key in SchemaIdentifier]: {
    [key: string]: SchemaOption
  }
}

type UIState = {
  isSidebarOpen: boolean
  selectedDiagram: SchemaIdentifier | null
  selectedDiagramName: string | null
  generalSchemaOptions: Record<string, SchemaOption>
  schemaOptions: SchemaOptions
}

const schemaNames: Record<SchemaIdentifier, string> = {
  dualidades: 'Dualidades',
  cuadros: 'Cuadros',
  'cuadros-complejos': 'Cuadros complejos',
  octagonos: 'Octágonos',
  'octagonos-empiricos': 'Octágonos empíricos',
  triadas: 'Triadas',
  'triadas-empiricas': 'Triadas empíricas',
  dialectica: 'Dialéctica',
  'dialectica-empirica': 'Dialéctica empírica',
  procesual: 'Procesual',
  'capas-discursivas': 'Capas discursivas',
  matrioskas: 'Matrioskas',
}

const generalSchemaOptions: {
  [key: string]: SchemaOption
} = {
  diagramAutoupdate: {
    type: 'bool',
    name: 'Actualizar diagrama automáticamente',
    value: true,
    longDescription:
      'Actualizar diagrama automáticamente cuando se realizan cambios',
  },
  factorizations: {
    type: 'select',
    name: 'Factorizar',
    value: 'ninguna',
    options: [
      { value: 'ninguna', name: 'ninguna' },
      { value: 'rectangular-1', name: 'rectangular 1' },
      { value: 'rectangular-2', name: 'rectangular 2' },
      { value: 'rectangular-3', name: 'rectangular 3' },
      { value: 'rectangular-4', name: 'rectangular 4' },
      { value: 'rectangular-5', name: 'rectangular 5' },
      { value: 'rectangular-6', name: 'rectangular 6' },
      { value: 'rectangular-7', name: 'rectangular 7' },
      { value: 'rectangular-8', name: 'rectangular 8' },
      { value: 'rectangular-9', name: 'rectangular 9' },
      { value: 'rectangular-10', name: 'rectangular 10' },
      { value: 'trapecial-1', name: 'trapecial 1' },
      { value: 'trapecial-2', name: 'trapecial 2' },
      { value: 'trapecial-3', name: 'trapecial 3' },
      { value: 'trapecial-4', name: 'trapecial 4' },
      { value: 'trapecial-5', name: 'trapecial 5' },
      { value: 'trapecial-6', name: 'trapecial 6' },
      { value: 'trapecial-7', name: 'trapecial 7' },
      { value: 'trapecial-8', name: 'trapecial 8' },
      { value: 'trapecial-9', name: 'trapecial 9' },
      { value: 'trapecial-10', name: 'trapecial 10' },
    ],
    longDescription: 'Factorizaciones rectangulares y trapeciales',
  },
}

const schemaOptions: SchemaOptions = {
  dualidades: {
    showDualityIndex: {
      type: 'bool',
      name: 'Índice',
      value: false,
      longDescription: 'Muestra el índice de cada dualidad',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
    },
    intensionFormContext: {
      type: 'bool',
      name: 'Intensión, forma, contexto',
      value: false,
      longDescription:
        'Anotaciones Intensión,Extensión, Contexto, Forma, Contenido',
    },
  },
  cuadros: {
    showDualityIndex: {
      type: 'bool',
      name: 'Índice',
      value: false,
      longDescription: 'Muestra el índice de cada dualidad',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
    },
    arrangement: {
      type: 'select',
      name: 'Agrupar',
      value: 'lista',
      options: [
        { value: 'lista', name: 'lista consecutiva' },
        { value: 'triadas', name: 'agrupar por triadas' },
        { value: 'tetradas', name: 'agrupar por tétradas' },
      ],
      longDescription: 'Agrupar y acomodar cuadros',
    },
    showRectangularFactorizations: {
      type: 'select',
      name: 'Ver factorizaciones',
      value: 'ninguna',
      options: [
        { value: 'ninguna', name: 'ninguna' },
        { value: 'rectangular-1', name: 'rectangular 1' },
        { value: 'rectangular-2', name: 'rectangular 2' },
        { value: 'rectangular-3', name: 'rectangular 3' },
        { value: 'rectangular-4', name: 'rectangular 4' },
        { value: 'rectangular-5', name: 'rectangular 5' },
        { value: 'rectangular-6', name: 'rectangular 6' },
        { value: 'rectangular-7', name: 'rectangular 7' },
        { value: 'rectangular-8', name: 'rectangular 8' },
        { value: 'rectangular-9', name: 'rectangular 9' },
        { value: 'rectangular-10', name: 'rectangular 10' },
        { value: 'trapecial-1', name: 'trapecial 1' },
        { value: 'trapecial-2', name: 'trapecial 2' },
        { value: 'trapecial-3', name: 'trapecial 3' },
        { value: 'trapecial-4', name: 'trapecial 4' },
        { value: 'trapecial-5', name: 'trapecial 5' },
        { value: 'trapecial-6', name: 'trapecial 6' },
        { value: 'trapecial-7', name: 'trapecial 7' },
        { value: 'trapecial-8', name: 'trapecial 8' },
        { value: 'trapecial-9', name: 'trapecial 9' },
        { value: 'trapecial-10', name: 'trapecial 10' },
      ],
      longDescription:
        'Mostrar posibles factorizaciones rectangulares y trapeciales como anotación',
      depends: {
        element: 'arrangement',
        value: 'tetradas',
      },
    },
  },
  'cuadros-complejos': {
    showDualityIndex: {
      type: 'bool',
      name: 'Índice',
      value: false,
      longDescription: 'Muestra el índice de cada dualidad',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
    },
    arrangement: {
      type: 'select',
      name: 'Agrupar',
      value: 'lista',
      options: [
        { value: 'lista', name: 'lista consecutiva' },
        { value: 'triadas', name: 'agrupar por triadas' },
        { value: 'tetradas', name: 'agrupar por tétradas' },
      ],
      longDescription: 'Agrupar y acomodar cuadros',
    },
    showRectangularFactorizations: {
      type: 'select',
      name: 'Ver factorizaciones',
      value: 'ninguna',
      options: [
        { value: 'ninguna', name: 'ninguna' },
        { value: 'rectangular-1', name: 'rectangular 1' },
        { value: 'rectangular-2', name: 'rectangular 2' },
        { value: 'rectangular-3', name: 'rectangular 3' },
        { value: 'rectangular-4', name: 'rectangular 4' },
        { value: 'rectangular-5', name: 'rectangular 5' },
        { value: 'rectangular-6', name: 'rectangular 6' },
        { value: 'rectangular-7', name: 'rectangular 7' },
        { value: 'rectangular-8', name: 'rectangular 8' },
        { value: 'rectangular-9', name: 'rectangular 9' },
        { value: 'rectangular-10', name: 'rectangular 10' },
        { value: 'trapecial-1', name: 'trapecial 1' },
        { value: 'trapecial-2', name: 'trapecial 2' },
        { value: 'trapecial-3', name: 'trapecial 3' },
        { value: 'trapecial-4', name: 'trapecial 4' },
        { value: 'trapecial-5', name: 'trapecial 5' },
        { value: 'trapecial-6', name: 'trapecial 6' },
        { value: 'trapecial-7', name: 'trapecial 7' },
        { value: 'trapecial-8', name: 'trapecial 8' },
        { value: 'trapecial-9', name: 'trapecial 9' },
        { value: 'trapecial-10', name: 'trapecial 10' },
      ],
      longDescription:
        'Mostrar posibles factorizaciones rectangulares y trapeciales como anotación',
      depends: {
        element: 'arrangement',
        value: 'tetradas',
      },
    },
  },
  octagonos: {
    showDualityIndex: {
      type: 'bool',
      name: 'Índice',
      value: false,
      longDescription: 'Muestra el índice de cada dualidad',
    },
    arrangement: {
      type: 'select',
      name: 'Agrupar',
      value: 'lista',
      options: [
        { value: 'lista', name: 'lista consecutiva' },
        { value: 'triadas', name: 'agrupar por triadas' },
        { value: 'tetradas', name: 'agrupar por tétradas' },
      ],
      longDescription: 'Agrupar y acomodar cuadros',
    },
  },
  'octagonos-empiricos': {
    showDualityIndex: {
      type: 'bool',
      name: 'Índice',
      value: false,
      longDescription: 'Muestra el índice de cada dualidad',
    },
    arrangement: {
      type: 'select',
      name: 'Agrupar',
      value: 'lista',
      options: [
        { value: 'lista', name: 'lista consecutiva' },
        { value: 'triadas', name: 'agrupar por triadas' },
        { value: 'tetradas', name: 'agrupar por tétradas' },
      ],
      longDescription: 'Agrupar y acomodar cuadros',
    },
  },
  triadas: {
    showDualityIndex: {
      type: 'bool',
      name: 'Índice',
      value: false,
      longDescription: 'Muestra el índice de cada dualidad',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
    },
    intensionFormContext: {
      type: 'bool',
      name: 'Intensión, forma, contexto',
      value: false,
      longDescription:
        'Anotaciones Intensión,Extensión, Contexto, Forma, Contenido',
    },
  },
  'triadas-empiricas': {
    showDualityIndex: {
      type: 'bool',
      name: 'Índice',
      value: false,
      longDescription: 'Muestra el índice de cada dualidad',
    },
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
    },
    intensionFormContext: {
      type: 'bool',
      name: 'Intensión, forma, contexto',
      value: false,
      longDescription:
        'Anotaciones Intensión,Extensión, Contexto, Forma, Contenido',
    },
  },
  dialectica: {
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
    },
  },
  'dialectica-empirica': {
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
    },
  },
  procesual: {
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
    },
  },
  'capas-discursivas': {
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
    },
  },
  matrioskas: {},
}

const initialState: UIState = {
  isSidebarOpen: false,
  selectedDiagram: null,
  selectedDiagramName: null,
  generalSchemaOptions,
  schemaOptions,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarOpen: (state: UIState, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload
    },
    setSelectedDiagram: (
      state: UIState,
      action: PayloadAction<SchemaIdentifier>
    ) => {
      state.selectedDiagram = action.payload
      state.selectedDiagramName =
        schemaNames[action.payload as SchemaIdentifier]
    },
    setDiagramOption: (
      state: UIState,
      action: PayloadAction<{
        diagramName: SchemaIdentifier
        optionId: string
        value: any
      }>
    ) => {
      state.schemaOptions[action.payload.diagramName][
        action.payload.optionId
      ].value = action.payload.value
    },
    setGeneralDiagramOption: (
      state: UIState,
      action: PayloadAction<{ optionId: string; value: any }>
    ) => {
      state.generalSchemaOptions[action.payload.optionId].value =
        action.payload.value
    },
  },
})

export const {
  setSidebarOpen,
  setSelectedDiagram,
  setDiagramOption,
  setGeneralDiagramOption,
} = uiSlice.actions

export default uiSlice.reducer
