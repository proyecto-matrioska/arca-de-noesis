import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App'
import store from './state/store'
import './i18n/initI18n'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(new URL('../public/serviceWorker.js', import.meta.url))
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration)
      })
      .catch(error => {
        console.log('Error al registrar el Service Worker:', error)
      })
  })
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
)
