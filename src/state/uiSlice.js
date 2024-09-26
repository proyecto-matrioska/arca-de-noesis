import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: false,
    selectedDiagram: null,
  },
  reducers: {
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload
    },
    setSelectedDiagram: (state, action) => {
      state.selectedDiagram = action.payload
    },
  },
})

export const { setExcalidrawApi, setSidebarOpen, setSelectedDiagram } =
  uiSlice.actions

export default uiSlice.reducer
