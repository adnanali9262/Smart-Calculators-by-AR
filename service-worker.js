self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('smart-calculators-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        './calculators/dc-cable.html',
        './calculators/energy-consumption.html'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
