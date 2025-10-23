import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SchemaIdentifier } from '../schemas/schema'
import {
  SchemaOption,
  SchemaOptionIdentifier,
  SchemaOptions,
} from './uiOptions'
import { generalSchemaOptions, schemaOptions } from './uiOptions'

type UIState = {
  isSidebarOpen: boolean
  selectedDiagram: SchemaIdentifier | null
  selectedDiagramName: string | null
  generalSchemaOptions: Record<string, SchemaOption>
  schemaOptions: SchemaOptions
}

const schemaNames: Record<SchemaIdentifier, string> = {
  dualidades: 'SchemaNames.Dualities',
  cuadros: 'SchemaNames.Squares',
  'cuadros-complejos': 'SchemaNames.ComplexSquares',
  octagonos: 'SchemaNames.Octagons',
  'octagonos-empiricos': 'SchemaNames.EmpiricalOctagons',
  triadas: 'SchemaNames.Triads',
  'triadas-empiricas': 'SchemaNames.EmpiricalTriads',
  dialectica: 'SchemaNames.Dialectics',
  'dialectica-empirica': 'SchemaNames.EmpiricalDialectics',
  procesual: 'SchemaNames.Procesual',
  'capas-discursivas': 'SchemaNames.DiscursiveLayers',
  matrioskas: 'SchemaNames.Matrioskas',
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
        optionId: SchemaOptionIdentifier
        value: any
      }>
    ) => {
      const options = state.schemaOptions[action.payload.diagramName]
      const optId = action.payload.optionId
      if (options) {
        const opt = options[optId]
        if (opt) opt.value = action.payload.value
      }
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
