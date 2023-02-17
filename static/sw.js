const sCacheName = 'hello-pwa';
const aFilesToCache = ['./', './manifest.json', './favicon.png'];

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
});

self.addEventListener('fetch', (pEvent) => {
	console.log('Fetching somthing!!', pEvent.request.url);
	// pEvent.respondWith(fetch(pEvent.request));
	pEvent.respondWith(
		caches.match(pEvent.request).then((res) => {
			if (res) {
				// cache에 있다면 cache된 데이터 제공
				console.log('cached : ', res);
				return res;
			} else {
				// cache에 없다면 서버로 요청
				console.log('network request ');
				return fetch(pEvent.request);
			}
		})
	);
});
