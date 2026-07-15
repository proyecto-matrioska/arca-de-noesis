import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DialecticsDataEntry, SchemaIdentifier } from '../schemas/schema'
import { NoesisEntry, emptyEntries } from './noesisFormat'
import {
  SchemaOption,
  SchemaOptionIdentifier,
  SchemaOptions,
  generalSchemaOptions as defaultGeneralOptions,
  schemaOptions as defaultSchemaOptions,
} from './uiOptions'
import { hydrateTabFromShareUrl } from './shareEncoding'
import type { RootState } from './store'

export const schemaNames: Record<SchemaIdentifier, string> = {
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

export type ExcalidrawViewport = {
  scrollX: number
  scrollY: number
  zoom: number
}

export type SidebarTabId = 'dataEditor' | 'diagramOptions'

export type TabState = {
  id: string
  filename: string
  fileHandle: FileSystemFileHandle | null
  isDirty: boolean
  entries: NoesisEntry[]
  selectedDiagram: SchemaIdentifier | null
  isSidebarOpen: boolean
  sidebarActiveTab: SidebarTabId
  generalOptions: Record<string, SchemaOption>
  schemaOptions: SchemaOptions
  excalidrawViewport: ExcalidrawViewport | null
}

type DialecticsState = {
  tabs: TabState[]
  activeTabId: string
}

let _tabCounter = 0
const newTabId = () => `tab-${++_tabCounter}`

const defaultTab = (): TabState => ({
  id: newTabId(),
  filename: '',
  fileHandle: null,
  isDirty: false,
  entries: emptyEntries(),
  selectedDiagram: null,
  isSidebarOpen: false,
  sidebarActiveTab: 'dataEditor',
  generalOptions: structuredClone(defaultGeneralOptions),
  schemaOptions: structuredClone(defaultSchemaOptions),
  excalidrawViewport: null,
})

const initialState: DialecticsState = (() => {
  const tab = hydrateTabFromShareUrl(defaultTab())
  return { tabs: [tab], activeTabId: tab.id }
})()

const getActive = (state: DialecticsState): TabState => {
  const tab = state.tabs.find(t => t.id === state.activeTabId)
  return tab ?? state.tabs[0]
}

const resolveTab = (state: DialecticsState, tabId?: string): TabState => {
  if (tabId) return state.tabs.find(t => t.id === tabId) ?? getActive(state)
  return getActive(state)
}

export const dialecticsSlice = createSlice({
  name: 'dialectics',
  initialState,
  reducers: {
    addTab: (state: DialecticsState) => {
      const tab = defaultTab()
      state.tabs.push(tab)
      state.activeTabId = tab.id
    },
    closeTab: (state: DialecticsState, action: PayloadAction<{ id: string }>) => {
      if (state.tabs.length <= 1) return
      const idx = state.tabs.findIndex(t => t.id === action.payload.id)
      if (idx === -1) return
      state.tabs.splice(idx, 1)
      if (state.activeTabId === action.payload.id) {
        state.activeTabId =
          state.tabs[Math.min(idx, state.tabs.length - 1)].id
      }
    },
    switchTab: (
      state: DialecticsState,
      action: PayloadAction<{ id: string }>
    ) => {
      if (state.tabs.some(t => t.id === action.payload.id)) {
        state.activeTabId = action.payload.id
      }
    },
    setFileHandle: (
      state: DialecticsState,
      action: PayloadAction<{ handle: FileSystemFileHandle | null; tabId?: string }>
    ) => {
      resolveTab(state, action.payload.tabId).fileHandle = action.payload.handle
    },
    setIsDirty: (
      state: DialecticsState,
      action: PayloadAction<{ dirty: boolean; tabId?: string }>
    ) => {
      resolveTab(state, action.payload.tabId).isDirty = action.payload.dirty
    },
    setDialecticsData: (
      state: DialecticsState,
      action: PayloadAction<{
        filename: string
        entries: NoesisEntry[]
        tabId?: string
      }>
    ) => {
      const tab = action.payload.tabId
        ? state.tabs.find(t => t.id === action.payload.tabId) ?? getActive(state)
        : getActive(state)
      tab.filename = action.payload.filename
      tab.entries = action.payload.entries
    },
    updateEntry: (
      state: DialecticsState,
      action: PayloadAction<{ update: DialecticsDataEntry; index: number }>
    ) => {
      const tab = getActive(state)
      tab.entries[action.payload.index].data = action.payload.update
      tab.isDirty = true
    },
    updateAnnotation: (
      state: DialecticsState,
      action: PayloadAction<{
        entryIndex: number
        dualityIndex: 0 | 1
        text: string
      }>
    ) => {
      const tab = getActive(state)
      tab.entries[action.payload.entryIndex].annotations[
        action.payload.dualityIndex
      ] = action.payload.text
      tab.isDirty = true
    },
    moveUpEntry: (
      state: DialecticsState,
      action: PayloadAction<{ index: number }>
    ) => {
      const tab = getActive(state)
      const i = action.payload.index
      if (i > 0) {
        const tmp = tab.entries[i - 1]
        tab.entries[i - 1] = tab.entries[i]
        tab.entries[i] = tmp
        tab.isDirty = true
      }
    },
    moveDownEntry: (
      state: DialecticsState,
      action: PayloadAction<{ index: number }>
    ) => {
      const tab = getActive(state)
      const i = action.payload.index
      if (i < tab.entries.length - 1) {
        const tmp = tab.entries[i + 1]
        tab.entries[i + 1] = tab.entries[i]
        tab.entries[i] = tmp
        tab.isDirty = true
      }
    },
    deleteEntry: (
      state: DialecticsState,
      action: PayloadAction<{ index: number }>
    ) => {
      const tab = getActive(state)
      if (tab.entries.length <= 1) {
        tab.entries = emptyEntries()
      } else {
        const i = action.payload.index
        tab.entries =
          i === 0
            ? tab.entries.slice(1)
            : [
                ...tab.entries.slice(0, i),
                ...tab.entries.slice(i + 1),
              ]
      }
      tab.isDirty = true
    },
    insertEntry: (
      state: DialecticsState,
      action: PayloadAction<{ index: number }>
    ) => {
      const tab = getActive(state)
      const blank: NoesisEntry = {
        data: [
          ['', '', '', ''],
          ['', '', '', ''],
        ],
        annotations: ['', ''],
      }
      if (tab.entries.length <= 0) {
        tab.entries = [blank]
      } else {
        const i = action.payload.index
        tab.entries = [
          ...tab.entries.slice(0, i + 1),
          blank,
          ...tab.entries.slice(i + 1),
        ]
      }
      tab.isDirty = true
    },
    prefixEntries: (
      state: DialecticsState,
      action: PayloadAction<{ entries: NoesisEntry[]; tabId?: string }>
    ) => {
      const tab = resolveTab(state, action.payload.tabId)
      tab.entries = [...action.payload.entries, ...tab.entries]
      tab.isDirty = true
    },
    setTabSelectedDiagram: (
      state: DialecticsState,
      action: PayloadAction<SchemaIdentifier>
    ) => {
      getActive(state).selectedDiagram = action.payload
    },
    setTabSidebarOpen: (
      state: DialecticsState,
      action: PayloadAction<boolean>
    ) => {
      getActive(state).isSidebarOpen = action.payload
    },
    setTabSidebarActiveTab: (
      state: DialecticsState,
      action: PayloadAction<SidebarTabId>
    ) => {
      getActive(state).sidebarActiveTab = action.payload
    },
    setDiagramOption: (
      state: DialecticsState,
      action: PayloadAction<{
        diagramName: SchemaIdentifier
        optionId: SchemaOptionIdentifier
        value: any
      }>
    ) => {
      const tab = getActive(state)
      const opt = tab.schemaOptions[action.payload.diagramName]?.[action.payload.optionId]
      if (opt) opt.value = action.payload.value
    },
    setGeneralOption: (
      state: DialecticsState,
      action: PayloadAction<{ optionId: string; value: any }>
    ) => {
      const opt = getActive(state).generalOptions[action.payload.optionId]
      if (opt) opt.value = action.payload.value
    },
    setExcalidrawViewport: (
      state: DialecticsState,
      action: PayloadAction<{ viewport: ExcalidrawViewport; tabId: string }>
    ) => {
      const tab = state.tabs.find(t => t.id === action.payload.tabId)
      if (tab) tab.excalidrawViewport = action.payload.viewport
    },
  },
})

export const {
  addTab,
  closeTab,
  switchTab,
  setFileHandle,
  setIsDirty,
  setDialecticsData,
  updateEntry,
  updateAnnotation,
  moveUpEntry,
  moveDownEntry,
  insertEntry,
  deleteEntry,
  prefixEntries,
  setTabSelectedDiagram,
  setTabSidebarOpen,
  setTabSidebarActiveTab,
  setDiagramOption,
  setGeneralOption,
  setExcalidrawViewport,
} = dialecticsSlice.actions

export const selectActiveTab = (state: RootState): TabState => {
  const s = state.dialectics
  return s.tabs.find(t => t.id === s.activeTabId) ?? s.tabs[0]
}

export default dialecticsSlice.reducer
