import { AppDispatch, RootState } from './store'
import {
  addTab,
  setDialecticsData,
  setFileHandle,
  setIsDirty,
  selectActiveTab,
} from './dialecticsSlice'
import { migrateToLatest } from './noesisFormat'
import * as FileSaver from 'file-saver'
import examples from '../examples/examples'

const hasFileSystemAccessAPI = () => 'showSaveFilePicker' in window

export const loadDataFile =
  (openInNewTab = false) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
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
        const raw = JSON.parse(contents)
        const { entries } = migrateToLatest(raw)

        if (openInNewTab) dispatch(addTab())
        const tabId = selectActiveTab(getState()).id
        dispatch(setDialecticsData({ filename: file.name, entries, tabId }))
        dispatch(setFileHandle({ handle: fileHandle, tabId }))
        dispatch(setIsDirty({ dirty: false, tabId }))
      } else {
        return new Promise(resolve => {
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = '.noesis'

          input.onchange = async (e: Event) => {
            file = ((e.target as HTMLInputElement).files ?? [])[0]
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = () => {
              const raw = JSON.parse(reader.result as string)
              const { entries } = migrateToLatest(raw)
              if (openInNewTab) dispatch(addTab())
              const tabId = selectActiveTab(getState()).id
              dispatch(
                setDialecticsData({
                  filename: file?.name || 'untitled.noesis',
                  entries,
                  tabId,
                })
              )
              dispatch(setFileHandle({ handle: null, tabId }))
              dispatch(setIsDirty({ dirty: false, tabId }))
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
    const tab = selectActiveTab(getState())
    const { id: tabId, filename, entries, fileHandle } = tab

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
        await writable.write(
          JSON.stringify({ version: 2, entries }, null, 2)
        )
        await writable.close()

        dispatch(setFileHandle({ handle: targetFileHandle, tabId }))
        dispatch(
          setDialecticsData({
            filename: targetFileHandle.name,
            entries,
            tabId,
          })
        )
        dispatch(setIsDirty({ dirty: false, tabId }))
      } catch (error) {
        return
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
      const blob = new Blob(
        [JSON.stringify({ version: 2, entries }, null, 2)],
        { type: 'application/json;charset=utf-8' }
      )
      FileSaver.saveAs(blob, finalName)
      dispatch(setDialecticsData({ filename: finalName, entries, tabId }))
      dispatch(setIsDirty({ dirty: false, tabId }))
    }
  }

export const saveAsDataFile =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const tab = selectActiveTab(getState())
    const { id: tabId, filename, entries } = tab

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
      await writable.write(JSON.stringify({ version: 2, entries }, null, 2))
      await writable.close()
      dispatch(setFileHandle({ handle: newFileHandle, tabId }))
      dispatch(
        setDialecticsData({
          filename: newFileHandle.name,
          entries,
          tabId,
        })
      )
      dispatch(setIsDirty({ dirty: false, tabId }))
    } catch (error) {
      return
    }
  }

export const loadExample =
  (exampleName: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const example = examples[exampleName]
    const { entries } = migrateToLatest(example.data)
    const tabId = selectActiveTab(getState()).id
    dispatch(setFileHandle({ handle: null, tabId }))
    dispatch(setDialecticsData({ filename: example.filename, entries, tabId }))
    dispatch(setIsDirty({ dirty: false, tabId }))
  }
