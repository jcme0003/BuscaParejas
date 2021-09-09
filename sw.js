var myCache = 'testApp-v1';
var files = [
    './',
    './index.html',
    './manifest.webmanifest',
    './src/phaser.min.js',
    './def/phaser.d.ts',
    './src/load-sw.js',
    './src/main.js',
    './src/installable.js',
    './assets/icon-192.png',
    './assets/icon-256.png',
    './assets/icon-512.png',
    './assets/imgs/favicon.ico'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(myCache).then(function(cache) {
            return cache.addAll(files);
        })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if(key !== myCache) {
                    return caches.delete(key);
                }
            }));
        })
    );
});