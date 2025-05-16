/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'arca-de-noesis-cache-v1' // Nombre del cache

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    fetch('/arca-de-noesis/assets-manifest.json') // Lee el archivo asset-manifest.json
      .then(response => response.json())
      .then(assets => {
        const urlsToCache = [
          '/arca-de-noesis/',
          'https://unpkg.com/@excalidraw/excalidraw@0.17.6/dist/excalidraw-assets-dev/Virgil.woff2',
        ]
          .concat(
            Object.keys(assets)
              .filter(key => assets[key]['file'] !== undefined)
              .map(key => assets[key]['file'])
          )
          .concat(assets['css'] ? assets['css'] : [])
        console.log('urls to cache', urlsToCache)
        return caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(urlsToCache) // Cachea los recursos
        })
      })
      .catch(error => console.error(`Error reading asset manifest: ${error}`))
  )
})

// Intercepta las solicitudes y sirve desde el cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request) // Sirve desde el cache o hace la solicitud
    })
  )
})

// Limpia caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName) // Elimina caches antiguos
          }
          return null
        })
      )
    })
  )
})
