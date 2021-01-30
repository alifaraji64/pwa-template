//cache versioning is usefull when we have changed any of our static files
//so with any change in sw file we can fire the activate event bt clicking the skip waiting btn
//in chrome. and with each activate event we are deleting the old cache
let CACHE_STATIC_NAME = 'static-v17';
const assets = [
  '/src',
  '/src/index.html',
  '/src/contact.html',
  '/src/images/logo.PNG',
  '/src/css/style.css',
  '/src/app.js',
  'https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap',
  'https://fonts.gstatic.com/s/hachimarupop/v3/HI_TiYoRLqpLrEiMAuO9Ysfz7rWweN_ZpK1OtgnSaXe2-6ouLxxoAO2Opg.119.woff2',
  'https://fonts.gstatic.com/s/hachimarupop/v3/HI_TiYoRLqpLrEiMAuO9Ysfz7rWweN_ZpK1OtgnSaXe2-6ouLxxoAO2Opg.118.woff2'
];
//install event will fire after each change to sw file so after each change we are creating a new cache
self.addEventListener('install',function(e){
  console.log('installll');
  e.waitUntil(
      caches.open(CACHE_STATIC_NAME).then(cache=>{
      console.log('caching...');
      cache.addAll(assets);
    })
  );


})
//This fires once the old service worker is gone
self.addEventListener('activate', (e) => {
  //console.log('hello from activate event');
  //deleting the old cache when a new sw is activated
  //first we are removing the new version of cache from keys
  //then cycling through it and deleting all of them. the delete function is async
  e.waitUntil(
    caches.keys().then(keys=>{
      return Promise.all(
        keys.filter(key=> key !== CACHE_STATIC_NAME)
        .map(key=> caches.delete(key))
        )
    })
  );
});


self.addEventListener('fetch',function(e){
  //console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(cachedItem=>{
      return cachedItem || fetch(e.request)
    })
  )
})

