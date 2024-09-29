import { createSlice } from '@reduxjs/toolkit'

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
  },
  'triadas-empiricas': {
    elementDescriptions: {
      type: 'bool',
      name: 'Descripciones de elementos principales',
      value: false,
      longDescription: 'Descripciones de los elementos principales',
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
    schemaOptions,
  },
  reducers: {
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload
    },
    setSelectedDiagram: (state, action) => {
      state.selectedDiagram = action.payload
    },
    setDiagramOption: (
      state,
      { payload: { diagramName, optionId, value } }
    ) => {
      state.schemaOptions[diagramName][optionId].value = value
    },
  },
})

export const {
  setExcalidrawApi,
  setSidebarOpen,
  setSelectedDiagram,
  setDiagramOption,
} = uiSlice.actions

export default uiSlice.reducer
