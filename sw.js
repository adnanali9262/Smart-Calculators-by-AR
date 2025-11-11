const CACHE = 'smart-calculators-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/calculators.json',
  '/calculators/dc-cable.html',
  '/calculators/energy-units.html'
];
// install
self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
// activate
self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});
// fetch
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(res => res || fetch(evt.request).catch(()=>caches.match('/index.html')))
  );
});
