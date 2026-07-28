console.log("Service Worker loaded");

importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js");

firebase.initializeApp({
apiKey:"AIzaSyCxGeOoiqcG2R1gmA5iWK9XjpcF3K0jGOs",
authDomain:"thechamcong-dcd6e.firebaseapp.com",
databaseURL:"https://thechamcong-dcd6e-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId:"thechamcong-dcd6e",
storageBucket:"thechamcong-dcd6e.firebasestorage.app",
messagingSenderId:"141017912990",
appId:"1:141017912990:web:79ed5594b2f7ed3e624d8f"
});

const messaging = firebase.messaging();

const CACHE_NAME = "chamcong-v1.2.3";

self.addEventListener("install", event => {
event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(["./","./index.html","./manifest.json","./icon-196.png","./icon-512.png"])));
self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", event => {
event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});

messaging.onBackgroundMessage(payload => {
self.registration.showNotification(payload.data.title,{
body:payload.data.body,
icon:"icon-192.png"
});
});
