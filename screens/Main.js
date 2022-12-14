import React, { useContext, useEffect, useMemo, useState } from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/Authentication';
import { getEventsForNotification } from '../contexts/firebase';
import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

export default function Main() {
  const { user, hour, notificationPermissions } = useContext(AuthContext);

  const uid = useMemo(() => {
    const u = user || { uid: null };
    console.log('*** memoizing uid:', { uid: u.uid });
    return u.uid;
  }, [user]);

  const notify = (data) => {
    if (!data) return;

    let title = 'HELLO';
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
    // todo:  show notification button here!
    console.log('*** fire notification:', notification);
  };

  // todo: this should be a background task
  const scheduleNotification = (user) => {
    getEventsForNotification('BTSDVodrkdMT6F8A9Nw5UGYUuMu1', '2022-12-14', 9)
    .then(x => notify(x));
  };

  useEffect(() => {
    console.log('*** mounting Main');
  }, []);

  useEffect(() => {
    console.log('*** permission changes:', notificationPermissions)
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener = Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]);

  useEffect(() => {
    if (!uid) return;
    console.log('*** hour changes: ', hour, uid);
  }, [hour, uid])

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
