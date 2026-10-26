// Offline support: precache the site shell on install, then serve from cache
// (network-first for pages so updates show up when online).
// Bump CACHE_VERSION when changing the precache list.
const CACHE_VERSION = 'v1';
const CACHE_NAME = 'qft-2026-' + CACHE_VERSION;

const PRECACHE = [
  './',
  'index.html',
  'qft_school_2026_lectures.html',
  'qft_school_2026_schedule.html',
  'qft_workshop_2026_schedule.html',
  'manifest.webmanifest',
  'Alexander-Zamolodchikov-700x467.jpeg',
  'fewster.jpg',
  'gomis.jpg',
  'hollands.jpg',
  'shifman.jpg',
  'srednicki.jpg',
  'assets/vendor/fonts/fonts.css',
  'assets/vendor/fonts/cormorant-garamond-latin-300-normal.woff2',
  'assets/vendor/fonts/cormorant-garamond-latin-400-normal.woff2',
  'assets/vendor/fonts/cormorant-garamond-latin-500-normal.woff2',
  'assets/vendor/fonts/cormorant-garamond-latin-600-normal.woff2',
  'assets/vendor/fonts/cormorant-garamond-latin-700-normal.woff2',
  'assets/vendor/fonts/cormorant-garamond-latin-400-italic.woff2',
  'assets/vendor/fonts/crimson-pro-latin-300-normal.woff2',
  'assets/vendor/fonts/crimson-pro-latin-400-normal.woff2',
  'assets/vendor/fonts/crimson-pro-latin-600-normal.woff2',
  'assets/vendor/fonts/crimson-pro-latin-300-italic.woff2',
  'assets/vendor/fonts/crimson-pro-latin-400-italic.woff2',
  'assets/vendor/fonts/jetbrains-mono-latin-300-normal.woff2',
  'assets/vendor/fonts/jetbrains-mono-latin-400-normal.woff2',
  'assets/vendor/fonts/inter-latin-300-normal.woff2',
  'assets/vendor/fonts/inter-latin-400-normal.woff2',
  'assets/vendor/fonts/inter-latin-500-normal.woff2',];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('qft-2026-') && k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // external links/embeds (e.g. map) are not cached

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
  );
});
