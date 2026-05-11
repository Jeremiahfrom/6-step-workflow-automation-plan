const CACHE = 'stappenplan-v1';
const ASSETS = [
  '/6-step-workflow-automation-plan/',
  '/6-step-workflow-automation-plan/index.html',
  '/6-step-workflow-automation-plan/manifest.json',
  '/6-step-workflow-automation-plan/icons/icon-192.png',
  '/6-step-workflow-automation-plan/icons/icon-512.png',
  '/6-step-workflow-automation-plan/icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
