import { configureStore } from '@reduxjs/toolkit'
import dialecticsReducer from './dialecticsSlice'
import { useDispatch, useSelector } from 'react-redux'

const createStore = () =>
  configureStore({
    reducer: {
      dialectics: dialecticsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: [/^dialectics\.tabs\.\d+\.fileHandle$/],
        },
      }),
  })

const store = createStore()

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()

export default store
