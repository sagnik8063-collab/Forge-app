export const notificationList: any[] = [];

export const addNotification = (url: string) => {

  notificationList.unshift({
    id: Date.now().toString(),
    url,
    timestamp: Date.now()
  });

};