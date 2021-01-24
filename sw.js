self.addEventListener('fetch',function(event){
    console.log(event);
})
let CACHE_STATIC_NAME = 'static-v22';

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_STATIC_NAME).then(function(cache) {
        return cache.addAll(
          [
            '/src/css/style.css',
            '/src/app.js',
            '/index.html',
            '/offline.html'
          ]
        );
      })
    );
  });

