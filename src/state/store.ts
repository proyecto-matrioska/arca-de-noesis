import { configureStore } from '@reduxjs/toolkit'
import dialecticsReducer from './dialecticsSlice'
import uiReducer from './uiSlice'
import { useDispatch, useSelector } from 'react-redux'

const createStore = () =>
  configureStore({
    reducer: {
      dialectics: dialecticsReducer,
      ui: uiReducer,
    },
  })

const store = createStore()

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()

export default store
