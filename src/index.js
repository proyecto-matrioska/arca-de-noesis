import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App'
import createStore from './state/createStore'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/arca-de-noesis/serviceWorker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration)
      })
      .catch(error => {
        console.log('Error al registrar el Service Worker:', error)
      })
  })
}

const store = createStore()
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
