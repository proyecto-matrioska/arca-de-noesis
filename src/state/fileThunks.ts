import { AppDispatch, RootState } from './store'
import { setDialecticsData, setFileHandle, setIsDirty } from './dialecticsSlice'
import * as FileSaver from 'file-saver'
import examples from '../examples/examples'

const hasFileSystemAccessAPI = () => 'showSaveFilePicker' in window

export const loadDataFile =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      let file: File | null

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

          input.onchange = async (e: Event) => {
            file = ((e.target as HTMLInputElement).files ?? [])[0]
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = () => {
              const data = JSON.parse(reader.result as string)
              dispatch(
                setDialecticsData({
                  filename: file?.name || 'untitled.noesis',
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
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Error loading file:', err)
      }
    }
  }

export const saveDataFile =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().dialectics
    const { filename, data, fileHandle } = state

    if (hasFileSystemAccessAPI()) {
      try {
        let targetFileHandle: FileSystemFileHandle | null = fileHandle

        if (!targetFileHandle) {
          targetFileHandle = await window.showSaveFilePicker({
            suggestedName: filename || 'untitled.noesis',
            types: [
              {
                description: 'Arca de Noesis Files',
                accept: { 'application/noesis': ['.noesis'] },
              },
            ],
          })
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

export const saveAsDataFile =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().dialectics
    const { filename, data } = state

    try {
      const newFileHandle = await window.showSaveFilePicker({
        suggestedName: filename || 'untitled.noesis',
        types: [
          {
            description: 'Arca de Noesis Files',
            accept: { 'application/noesis': ['.noesis'] },
          },
        ],
      })
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

export const loadExample =
  (exampleName: string) => async (dispatch: AppDispatch) => {
    const { filename, data } = examples[exampleName]
    dispatch(setFileHandle(null))
    dispatch(setDialecticsData({ filename, data }))
    dispatch(setIsDirty(false))
  }
