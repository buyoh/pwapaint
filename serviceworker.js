// https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API/Using_Service_Workers
const versionName = "v2";
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(versionName).then((cache) => {
      return cache.addAll([
        "/pwapaint/media/appicon.svg",
        "/pwapaint/index.css",
        "/pwapaint/index.html",
        "/pwapaint/index.js",
        "/pwapaint/serviceworker_loader.js",
        "/pwapaint/serviceworker.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res1) => {
      if (res1) {
        console.log("Fetching resource", event.request.url);
        return res1;
      }
      return fetch(event.request).then((res2) => {
        return caches.open(versionName).then((cache) => {
          console.log("Caching new resource", event.request.url);
          cache.put(event.request, res2.clone());
          return res2;
        });
      });
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => (key !== versionName ? caches.delete(key) : null))
      );
    })
  );
});
