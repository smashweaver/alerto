import React, { useContext, useEffect, useMemo, useState } from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/Authentication';
// import { PermissionStatus } from 'expo-modules-core';
// import * as Notifications from 'expo-notifications';
import { useNotification } from '../hooks';

export default function Main() {
  const scheduleNotification = useNotification();
  const { user, date, time } = useContext(AuthContext);

  const uid = useMemo(() => {
    const u = user || { uid: null };
    // console.log('*** memoizing uid:', { uid: u.uid });
    return u.uid;
  }, [user]);

  /* const handleNotification = (notification) => {
    console.log('*** fire notification:', notification.request.content.body);
  }; */

  useEffect(() => {
    console.log('*** mounting Main');

    return () => console.log('*** unmounting Main');
  }, []);

  /* useEffect(() => {
    console.log('*** permission changes:', notificationPermissions)
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener = Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]); */

  useEffect(() => {
    if (!uid) return;
     console.log('*** hour changes: ', time, date, uid);
     scheduleNotification(uid, date, time);
  }, [time, date, uid]);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
