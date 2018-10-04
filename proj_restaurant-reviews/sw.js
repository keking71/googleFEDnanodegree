const cacheName = 'v1';
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

self.addEventListener('install', function(event){ // when the service worker is installed
  event.waitUntil( // keep the service worker open
    caches.open(cacheName) // open cache
      .then(function(cache) { // then perform function
        return cache.addAll(cacheFiles); // add array of resources to the cache
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith( // replace default fetch handling
    caches.match(event.request) // search for this request
      .then(function(response) { // then perform function
        if (response) { // check there is a response
          return response; // return the response
        }

        var fetchRequest = event.request.clone(); // save the request

        return fetch(fetchRequest).then( // return the request
          function(response) {
            if (!response || response.status !== 200) { // check there is a response and it's valid
            return response; // return the response
            }

            var responseToCache = response.clone(); // save the response

            caches.open(cacheName) // open the cache
              .then(function(cache) { // then perform function
                cache.put(event.request, responseToCache); // add to cache
              });

              return response;
          }
        );
      })
  );
});
