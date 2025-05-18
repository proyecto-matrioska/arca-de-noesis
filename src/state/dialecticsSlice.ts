import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DialecticsDataEntry } from '../schemas/schema'

type DialecticsState = {
  filename: string
  fileHandle: FileSystemFileHandle | null
  isDirty: boolean
  data: DialecticsDataEntry[]
}

const initialState: DialecticsState = {
  filename: '',
  fileHandle: null,
  isDirty: false,
  data: [
    [
      ['', '', '', ''],
      ['', '', '', ''],
    ],
  ],
}

export const dialecticsSlice = createSlice({
  name: 'dialectics',
  initialState,
  reducers: {
    setFileHandle: (
      state: DialecticsState,
      action: PayloadAction<FileSystemFileHandle | null>
    ) => {
      state.fileHandle = action.payload
    },
    setIsDirty: (state: DialecticsState, action: PayloadAction<boolean>) => {
      state.isDirty = action.payload
    },
    setDialecticsData: (
      state: DialecticsState,
      action: PayloadAction<{ filename: string; data: DialecticsDataEntry[] }>
    ) => {
      state.filename = action.payload.filename
      state.data = action.payload.data
    },
    updateEntry: (
      state: DialecticsState,
      action: PayloadAction<{ update: DialecticsDataEntry; index: number }>
    ) => {
      state.data[action.payload.index] = action.payload.update
      state.isDirty = true
    },
    moveUpEntry: (
      state: DialecticsState,
      action: PayloadAction<{ index: number }>
    ) => {
      if (action.payload.index > 0) {
        const tmp = state.data[action.payload.index - 1]
        state.data[action.payload.index - 1] = state.data[action.payload.index]
        state.data[action.payload.index] = tmp
        state.isDirty = true
      }
    },
    moveDownEntry: (
      state: DialecticsState,
      action: PayloadAction<{ index: number }>
    ) => {
      if (action.payload.index < state.data.length - 1) {
        const tmp = state.data[action.payload.index + 1]
        state.data[action.payload.index + 1] = state.data[action.payload.index]
        state.data[action.payload.index] = tmp
        state.isDirty = true
      }
    },
    deleteEntry: (
      state: DialecticsState,
      action: PayloadAction<{ index: number }>
    ) => {
      if (state.data.length <= 1) {
        state.data = [
          [
            ['', '', '', ''],
            ['', '', '', ''],
          ],
        ]
      } else {
        const updatedData: DialecticsDataEntry[] =
          action.payload.index === 0
            ? [...state.data.slice(1)]
            : [
                ...state.data.slice(0, action.payload.index),
                ...state.data.slice(action.payload.index + 1),
              ]
        state.data = updatedData
      }
      state.isDirty = true
    },
    insertEntry: (
      state: DialecticsState,
      action: PayloadAction<{ index: number }>
    ) => {
      if (state.data.length <= 0) {
        state.data = [
          [
            ['', '', '', ''],
            ['', '', '', ''],
          ],
        ]
      } else {
        const updatedData: DialecticsDataEntry[] = [
          ...state.data.slice(0, action.payload.index + 1),
          [
            ['', '', '', ''],
            ['', '', '', ''],
          ],
          ...state.data.slice(action.payload.index + 1),
        ]
        state.data = updatedData
      }
      state.isDirty = true
    },
  },
})

export const {
  setFileHandle,
  setIsDirty,
  setDialecticsData,
  updateEntry,
  moveUpEntry,
  moveDownEntry,
  insertEntry,
  deleteEntry,
} = dialecticsSlice.actions

export default dialecticsSlice.reducer
