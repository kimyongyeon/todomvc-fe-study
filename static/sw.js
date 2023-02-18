const sCacheName = 'hello-pwa-v1';
const aFilesToCache = ['./', './manifest.json', './favicon.png'];
const apiCacheName = 'api-v1';

caches.delete(apiCacheName);

self.addEventListener('install', (pEvent) => {
	console.log('서비스 워커 설치함');
	pEvent.waitUntil(
		caches.open(sCacheName).then((pCache) => {
			return pCache.addAll(aFilesToCache);
		})
	);
});

self.addEventListener('activate', (pEvent) => {
	console.log('서비스 워커 동작 시작됨!');
	pEvent.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (sCacheName !== cacheName && cacheName.startsWith('hello-pwa')) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// https://carmalou.com/lets-take-this-offline/2019/04/16/cache-requests-with-service-worker.html
self.addEventListener('fetch', (pEvent) => {
	console.log('Fetching somthing!!', pEvent.request.url);
	pEvent.respondWith(
		caches.match(pEvent.request).then(function (r) {
			return (
				r ||
				fetch(pEvent.request).then(function (response) {
					return caches.open(apiCacheName).then(function (cache) {
						cache.put(pEvent.request, response.clone());
						return response;
					});
				})
			);
		})
	);
});
