/* MyDope Off — Service Worker */
const CACHE = 'mydopeoff-v28';
const ASSETS = [
  './','./index.html','./inscription.html','./suivi.html','./psychochecker.html',
  './fiches.html','./rdr.html','./soutenir.html','./guide.html','./maze.html','./tetris.html','./controles.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(ASSETS.map(u => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    e.respondWith(fetch(e.request).then(r => { const c=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,c)); return r; }).catch(() => caches.match(e.request)));
    return;
  }
  if (url.includes('api.groq.com')) return; // jamais de cache pour l'IA
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(r => {
    if (r && r.status===200 && r.type!=='opaque'){ const c=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,c)); }
    return r;
  }).catch(() => { if (e.request.destination==='document') return caches.match('./index.html'); })));
});
