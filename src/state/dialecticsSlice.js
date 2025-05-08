import { createSlice } from '@reduxjs/toolkit'
import FileSaver from 'file-saver'
import examples from '../examples/examples'

const hasFileSystemAccessAPI = () => 'showSaveFilePicker' in window

export const dialecticsSlice = createSlice({
  name: 'dialectics',
  initialState: {
    filename: '',
    fileHandle: null,
    isDirty: false,
    data: [
      [
        ['', '', '', ''],
        ['', '', '', ''],
      ],
    ],
  },
  reducers: {
    setFileHandle: (state, { payload }) => {
      state.fileHandle = payload
    },
    setIsDirty: (state, { payload }) => {
      state.isDirty = payload
    },
    setDialecticsData: (state, { payload: { filename, data } }) => {
      state.filename = filename
      state.data = data
    },
    updateEntry: (state, { payload: { update, index } }) => {
      state.data[index] = update
      state.isDirty = true
    },
    moveUpEntry: (state, { payload: { index } }) => {
      if (index > 0) {
        const tmp = state.data[index - 1]
        state.data[index - 1] = state.data[index]
        state.data[index] = tmp
        state.isDirty = true
      }
    },
    moveDownEntry: (state, { payload: { index } }) => {
      if (index < state.data.length - 1) {
        const tmp = state.data[index + 1]
        state.data[index + 1] = state.data[index]
        state.data[index] = tmp
        state.isDirty = true
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
      state.isDirty = true
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

export const loadDataFile = () => async dispatch => {
  try {
    let file

    if (hasFileSystemAccessAPI()) {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Arca de Noesis Files',
            accept: { 'application/noesis': ['.noesis'] },
          },
        ],
      })
      file = await fileHandle.getFile()
      const contents = await file.text()
      const data = JSON.parse(contents)
      dispatch(setDialecticsData({ filename: file.name, data }))
      dispatch(setFileHandle(fileHandle))
      dispatch(setIsDirty(false))
    } else {
      // Fallback usando input type="file"
      return new Promise(resolve => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.noesis'

        input.onchange = async e => {
          file = e.target.files[0]
          const reader = new FileReader()
          reader.readAsText(file)
          reader.onload = () => {
            const data = JSON.parse(reader.result)
            dispatch(
              setDialecticsData({
                filename: file.name,
                data,
              })
            )
            dispatch(setFileHandle(null))
            dispatch(setIsDirty(false))
            resolve()
          }
        }
        input.click()
      })
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Error loading file:', err)
    }
  }
}

export const saveDataFile = () => async (dispatch, getState) => {
  const state = getState().dialectics
  const { filename, data, fileHandle } = state

  if (hasFileSystemAccessAPI()) {
    try {
      let targetFileHandle = fileHandle

      if (!targetFileHandle) {
        const options = {
          suggestedName: filename || 'untitled.noesis',
          types: [
            {
              description: 'Arca de Noesis Files',
              accept: { 'application/noesis': ['.noesis'] },
            },
          ],
        }
        targetFileHandle = await window.showSaveFilePicker(options)
      }

      const writable = await targetFileHandle.createWritable()
      await writable.write(JSON.stringify(data, null, 2))
      await writable.close()

      dispatch(setFileHandle(targetFileHandle))
      dispatch(setDialecticsData({ filename: targetFileHandle.name, data }))
      dispatch(setIsDirty(false))
    } catch (error) {
      return // Usuario canceló
    }
  } else {
    let name = filename || 'untitled.noesis'
    if (!name.endsWith('.noesis')) name += '.noesis'
    const input = window.prompt('Guardar como', name)
    if (input === null) return
    if (input === '') {
      window.alert('Especifique un nombre de archivo')
      return
    }
    const finalName = input.endsWith('.noesis') ? input : `${input}.noesis`
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json;charset=utf-8',
    })
    FileSaver.saveAs(blob, finalName)
    dispatch(setDialecticsData({ filename: finalName, data }))
    dispatch(setIsDirty(false))
  }
}

export const saveAsDataFile = () => async (dispatch, getState) => {
  const state = getState().dialectics
  const { filename, data } = state

  try {
    const options = {
      suggestedName: filename || 'untitled.noesis',
      types: [
        {
          description: 'Arca de Noesis Files',
          accept: { 'application/noesis': ['.noesis'] },
        },
      ],
    }
    const newFileHandle = await window.showSaveFilePicker(options)
    const writable = await newFileHandle.createWritable()
    await writable.write(JSON.stringify(data, null, 2))
    await writable.close()
    dispatch(setFileHandle(newFileHandle))
    dispatch(setDialecticsData({ filename: newFileHandle.name, data }))
    dispatch(setIsDirty(false))
  } catch (error) {
    return
  }
}

export const loadExample = example => async dispatch => {
  const { filename, data } = examples[example]
  console.log(filename, example)
  dispatch(setFileHandle(null))
  dispatch(setDialecticsData({ filename, data }))
  dispatch(setIsDirty(false))
}

export default dialecticsSlice.reducer
