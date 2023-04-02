import { useEffect, useState, useMemo } from "react";
import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function useNotification({ getEventsForNotification }) {
  const [notificationPermissions, setNotificationPermissions] = useState(PermissionStatus.UNDETERMINED);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const requestNotificationPermissions = () => {
    const setStatus = p => {
      setNotificationPermissions(p.status);
    };

    Notifications
    .requestPermissionsAsync()
    .then(setStatus);
  };

  const createNotification = (data) => {
    if (!data) return;
    console.log('*** createNotification', { data });

    const sound = true;
    const vibrate = false;
    let title = 'REMINDER';
    switch (data.alert) {
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

    const body = data.title;
    const priority = Notifications.AndroidNotificationPriority.HIGH

    const schedulingOptions = {
      content: { title, body, sound, priority, vibrate },
      trigger: { seconds: 1 },
    };

    Notifications.scheduleNotificationAsync(schedulingOptions);
  };

  const handleNotification = (notification) => {
    console.log('*** fire notification:', notification.request.content);
  };

  // todo: this should be a background task
  const notify = async (notifyUserId, notifyDate, notifyStart) => {
    console.log('*** notify:', { notifyUserId, notifyDate, notifyStart, notificationPermissions});
    if (!isNotificationEnabled) return;
    const events = await getEventsForNotification(notifyUserId, notifyDate, notifyStart);
    events.forEach(event => createNotification(event));
  };

  useEffect(() => {
    console.log('*** mounting useNotification');
    requestNotificationPermissions();

    const listener = Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, []);

  useEffect(() => {
    setIsNotificationEnabled(notificationPermissions === PermissionStatus.GRANTED);
  }, [notificationPermissions]);

  return notify;
}
