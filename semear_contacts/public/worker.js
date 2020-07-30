var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
    '/',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/1.chunk.js',
    '/static/js/0.chunk.js',
    '/favicon.ico',
    '/css?family=Open+Sans',
    '/icon?family=Material+Icons',
    '/src/components/navbar.jsx',
    '/src/assets/icon/icons.js',
    '/src/assets/style/styles.js'
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});