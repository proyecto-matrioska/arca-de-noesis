import { configureStore } from '@reduxjs/toolkit'
import dialecticsReducer from './dialecticsSlice'
import uiReducer from './uiSlice'

const createStore = () =>
  configureStore({
    reducer: {
      dialectics: dialecticsReducer,
      ui: uiReducer,
    },
  })

export default createStore
