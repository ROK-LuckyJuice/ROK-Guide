self.addEventListener('push', event => {
  let data={title:'🛡️ 보호막 사용 시간 알림',body:'보호막 사용 시간을 확인하세요.'};
  try {if(event.data)data={...data,...event.data.json()}}catch{}
  event.waitUntil(self.registration.showNotification(data.title,{
    body:data.body,icon:'./favicon.ico',badge:'./favicon.ico',tag:'rok-shield-'+(data.slot||'notice'),
    data:{url:self.registration.scope},requireInteraction:false
  }));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url||self.registration.scope));
});
