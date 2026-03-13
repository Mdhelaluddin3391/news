// news-website/sw.js (Pehle se hi aesa hona chahiye)
self.addEventListener('push', function(event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: data.icon || 'images/default-icon.png',
            data: {
                url: data.url
            }
        };

        // event.waitUntil yeh ensure karta hai ki browser background me sleep mode me na chala jaye
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});