import { createSlice } from '@reduxjs/toolkit'

const schemaNames = {
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
}

const generalSchemaOptions = {
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

const schemaOptions = {
  dualidades: {
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
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: false,
    selectedDiagram: null,
    selectedDiagramName: null,
    generalSchemaOptions,
    schemaOptions,
  },
  reducers: {
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload
    },
    setSelectedDiagram: (state, action) => {
      state.selectedDiagram = action.payload
      state.selectedDiagramName = schemaNames[action.payload]
    },
    setDiagramOption: (
      state,
      { payload: { diagramName, optionId, value } }
    ) => {
      state.schemaOptions[diagramName][optionId].value = value
    },
    setGeneralDiagramOption: (state, { payload: { optionId, value } }) => {
      state.generalSchemaOptions[optionId].value = value
    },
  },
})

export const {
  setExcalidrawApi,
  setSidebarOpen,
  setSelectedDiagram,
  setDiagramOption,
  setGeneralDiagramOption,
} = uiSlice.actions

export default uiSlice.reducer
