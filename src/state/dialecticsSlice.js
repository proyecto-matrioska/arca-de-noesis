import { createSlice } from '@reduxjs/toolkit'
import FileSaver from 'file-saver'

export const dialecticsSlice = createSlice({
  name: 'dialectics',
  initialState: {
    filename: '',
    data: [
      [
        ['', '', '', ''],
        ['', '', '', ''],
      ],
    ],
  },
  reducers: {
    setDialecticsData: (state, { payload: { filename, data } }) => {
      state.filename = filename
      state.data = data
    },
    updateEntry: (state, { payload: { update, index } }) => {
      state.data[index] = update
    },
    moveUpEntry: (state, { payload: { index } }) => {
      if (index > 0) {
        const tmp = state.data[index - 1]
        state.data[index - 1] = state.data[index]
        state.data[index] = tmp
      }
    },
    moveDownEntry: (state, { payload: { index } }) => {
      if (index < state.data.length - 1) {
        const tmp = state.data[index + 1]
        state.data[index + 1] = state.data[index]
        state.data[index] = tmp
      }
    },
    deleteEntry: (state, { payload: { index } }) => {
      if (state.data.length <= 1) {
        state.data = [
          [
            ['', '', '', ''],
            ['', '', '', ''],
          ],
        ]
      } else {
        const updatedData =
          index === 0
            ? [...state.data.slice(1)]
            : [...state.data.slice(0, index), ...state.data.slice(index + 1)]
        state.data = updatedData
      }
    },
    insertEntry: (state, { payload: { index } }) => {
      if (state.data.length <= 0) {
        state.data = [
          [
            ['', '', '', ''],
            ['', '', '', ''],
          ],
        ]
      } else {
        const updatedData = [
          ...state.data.slice(0, index + 1),
          [
            ['', '', '', ''],
            ['', '', '', ''],
          ],
          ...state.data.slice(index + 1),
        ]
        state.data = updatedData
      }
    },
  },
})

export const {
  setDialecticsData,
  updateEntry,
  moveUpEntry,
  moveDownEntry,
  insertEntry,
  deleteEntry,
} = dialecticsSlice.actions

export const loadDataFile = file => dispatch => {
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = () => {
    const filename = file.name
    const data = JSON.parse(reader.result)
    dispatch(setDialecticsData({ filename, data }))
  }
}

export const saveDataFile = (name, data) => dispatch => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/JSON;charset=utf-8',
  })
  const filename = name.toLowerCase().endsWith('.json') ? name : `${name}.json`
  FileSaver.saveAs(blob, filename)
  dispatch(setDialecticsData({ filename, data }))
}

export default dialecticsSlice.reducer
