// Service Worker

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('airhorner').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                // '/inc/seccion1.html',
                // '/inc/seccion2.html',
                // '/inc/seccion3.html',
                // '/inc/seccion4.html',
                // '/inc/seccion5.html',
                // '/inc/seccion6.html',
                // '/inc/seccion7.html',
                // '/inc/seccion8.html',
                // '/inc/seccion9.html'
            ])
                .then(() => self.skipWaiting());
        })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
