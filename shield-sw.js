// ROK-Guide: per-alert icons. Existing push subscription and click behavior retained.
self.addEventListener('push', event => {
  let data = { title: '🛡️ 보호막 사용 시간 알림', body: '보호막 사용 시간을 확인하세요.' };
  try { if (event.data) data = { ...data, ...event.data.json() }; } catch (_) {}

  const isRelic = data.type === 'relic' || (!data.type && /유산/.test(data.title || ''));
  const icon = isRelic ? './rok-relic-alert.png' : './rok-shield-alert.png';
  const tag = isRelic ? 'rok-relic-' + (data.alert_id || Date.now()) : 'rok-shield-' + (data.slot || 'notice');
  let url = self.registration.scope;
  if (typeof data.url === 'string') {
    try { url = new URL(data.url, self.registration.scope).href; } catch (_) {}
  }

  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon,
    image: icon,
    badge: './favicon.ico',
    tag,
    data: { url },
    requireInteraction: false
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || self.registration.scope));
});
