// Firebase Cloud Messaging Service Worker
// This file handles background push notifications
//
// NOTE: Firebase config is injected at build time by Vite (see vite.config.js).
// The __FIREBASE_CONFIG__ placeholder is replaced with actual values from
// environment variables during the build process. This avoids hardcoding
// API keys in source control.

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
// Config is injected at build time from VITE_FIREBASE_* environment variables
firebase.initializeApp(self.__FIREBASE_CONFIG__ || {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'VoraPrep';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: '/pwa-192x192.png',
    badge: '/pwa-512x512.png',
    tag: payload.data?.tag || 'voraprep-notification',
    data: payload.data,
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click:', event);
  
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  // Open or focus the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already a window open
      for (const client of windowClients) {
        if (client.url.includes('voraprep') && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window if none found
      if (clients.openWindow) {
        const url = event.notification.data?.url || '/home';
        return clients.openWindow(url);
      }
    })
  );
});
