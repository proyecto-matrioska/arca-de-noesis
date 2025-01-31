/* eslint-disable no-restricted-globals */

const CACHE_NAME = "arca-de-noesis-cache-v1"; // Nombre del cache

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    fetch("/arca-de-noesis/asset-manifest.json") // Lee el archivo asset-manifest.json
      .then((response) => response.json())
      .then((assets) => {
        const urlsToCache = [
          "/",
          assets["files"]["index.html"],
          assets["files"]["main.js"], // Usa el nombre del archivo JS
          assets["files"]["main.css"], // Usa el nombre del archivo CSS
        ];
        console.log("urls to cache", urlsToCache);
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.addAll(urlsToCache); // Cachea los recursos
        });
      })
      .catch(console.error)
  );
});

// Intercepta las solicitudes y sirve desde el cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request); // Sirve desde el cache o hace la solicitud
    })
  );
});

// Limpia caches antiguos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Elimina caches antiguos
          }
          return null;
        })
      );
    })
  );
});
