// Offline support: keeps a copy of the app on the device so it opens without a connection.
// Files are served from that copy straight away and refreshed in the background, so a new
// version you publish shows up the second time the app is opened.
// Bump VERSION when you add or rename files in FILES.
const VERSION = 'ttp-v2';
const FILES = [
  './',
  './privacy.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    // Any page load inside the app (e.g. /index.html) falls back to the cached app page.
    const hit = await cache.match(req, {ignoreSearch: true}) || (req.mode === 'navigate' ? await cache.match('./') : undefined);
    const fresh = fetch(req).then(res => {
      if (res.ok && !res.redirected) cache.put(req, res.clone());
      return res;
    }).catch(() => hit || Response.error());
    if (hit) { e.waitUntil(fresh); return hit; }
    return fresh;
  }));
});
