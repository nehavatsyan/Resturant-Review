const cacheName = 'v1';

const cacheFiles = [
     '/',
     '/index.html',
     '/restaurant.html',
     '/css/styles.css',
     'js/dbhelper.js',
     'js/main.js',
     'js/restaurant_info.js',
     'data/restaurants.json',
     'img/1.jpg',
     'img/2.jpg',
     'img/3.jpg',
     'img/4.jpg',
     'img/5.jpg',
     'img/6.jpg',
     'img/7.jpg',
     'img/8.jpg',
     'img/9.jpg',
     'img/10.jpg'
];


//installation call event with "waitUntil" method
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheFiles);
        })
        .then(() => self.skipWaiting())
    );
});


// activating call event with "respondWith" method
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


//fetching call event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
