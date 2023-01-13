import { useEffect, useState, useMemo } from "react";
import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

export default function useNotification() {
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

  const notify = (data) => {
    if (!data) return;
    console.log('*** notify', { data });

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
    const sound = true;
    const priority = Notifications.AndroidNotificationPriority.HIGH

    const schedulingOptions = {
      content: { title, body, sound, priority },
      trigger: { seconds: 2 },
    };

    Notifications.scheduleNotificationAsync(schedulingOptions);
  };

  const handleNotification = (notification) => {
    console.log('*** fire notification:', notification.request.content.body);
  };

  // todo: this should be a background task
  const scheduleNotification = async (notifyUserId, notifyDate, notifyStart) => {
    // console.log('*** schedule:', { notifyUserId, notifyDate, notifyHour, notificationPermissions});
    if (!isNotificationEnabled) return;
    const events = await getEventsForNotification(notifyUserId, notifyDate, notifyStart);
    events.forEach(event => notify(event));
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

  return scheduleNotification;
}