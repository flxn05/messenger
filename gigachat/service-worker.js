self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('gigaCHAT-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/whatsapp.css',
        '/signal.css',
        '/client.js',
        '/website2.js',
        '/thumbnail.png',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
