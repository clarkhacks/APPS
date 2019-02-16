let version = '1';

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('JsonEditor').then(cache => {
      return cache.addAll([
        `/`,
        `/index.html?timestamp=${timeStamp}`,
        `/css/main.css?timestamp=${timeStamp}`,
        `/js/jsonedior.js?timestamp=${timeStamp}`,
        `/img/jsoneditor-icons.svf?timestamp=${timeStamp}`,
        `/img/favicon.png?timestamp=${timeStamp}`
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
