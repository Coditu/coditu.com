// The delivery app that registered a service worker at this URL (for Web Push)
// no longer lives on this site. A browser that still has the old worker fetches
// this file on its next visit; this one drops any caches and unregisters itself.
// Delete this file once no installed copies can be left.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.registration.unregister())
  );
});
