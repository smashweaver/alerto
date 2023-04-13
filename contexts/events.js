import UserStorage from '../hooks/userStorage';
import { canOccure, formatDate, normalizeMin } from '../utils';
import * as Notifications from 'expo-notifications';

export const scheduleBackgroundNotifications = async (events) => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    // Handle permission not granted error
    return;
  }

  const notificationIds = [];
  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const event of events) {
    const fireDate = new Date();
    fireDate.setHours(event.hour, event.min, 0, 0);

    let title = 'REMINDER';
    switch (event.alert) {
      case 1:
        title = 'ATTENTION';
        break;
      case 2:
        title = 'IMPORTANT';
        break;
      case 3:
        title = 'URGENT';
        break;
      default:
        break;
    }
    const body = event.title;
    const priority = Notifications.AndroidNotificationPriority.HIGH

    const notificationContent = {
      title,
      body,
      data: {
        eventId: event.id,
      },
      sound: 'default',
      priority,
      channelId: 'events',
      vibrate: [0, 250, 250, 250],
    };

    console.log({ notificationContent, fireDate });

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: {
        date: fireDate,
        channelId: 'events',
      },
    });

    notificationIds.push(notificationId);
  }

  return notificationIds;
}


const getEvents = async (ownerId, date) => {
  const store = new UserStorage(ownerId);
  const profile = await store.getProfile();
  //console.log('*** background getEvents', profile);
  const { events, dated } = profile;
  const result = [];

  events.forEach(data => {
    if (!canOccure(date, data.occurence)) return;
    const {
      id,
      title,
      hour,
      min,
      duration,
      note,
      alert,
      custom,
    } = data;
    const start = hour * 60 + min;
    result.push({
      id,
      title,
      hour,
      min,
      duration,
      note,
      alert,
      custom,
      start,
      isEditable: false,
      isDated: false,
    });
  });

  (dated[date] || []).forEach(data => {
    const {
      id,
      title,
      hour,
      min,
      duration,
      note,
      alert,
      custom,
    } = data;
    const start = hour * 60 + min;
    result.push({
      id,
      title,
      hour,
      min,
      duration,
      note,
      alert,
      custom,
      start,
      isEditable: true,
      isDated: true,
    });
  })

  //console.log('*** background:', { result });

  return result;
};

const calcTime = (date) => {
  const hr = date.getHours();
  const min = normalizeMin(date.getMinutes());
  return hr * 60 + min;
};

export const getEventsToNotify = async (ownerId) => {
  const d = new Date();
  const date = formatDate(d);
  const time = calcTime(d);
  //console.log('*** background: ', { date, time })
  const events = await getEvents(ownerId, date);
  //console.log('*** background: ', {events});
  return events.filter(x => x.start >= time);
};
