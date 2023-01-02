import React, { useContext, useEffect, useMemo, useState } from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/Authentication';
import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

export default function Main() {
  const { user, date, time, active, notificationPermissions, scheduleNotification } = useContext(AuthContext);

  const uid = useMemo(() => {
    const u = user || { uid: null };
    console.log('*** memoizing uid:', { uid: u.uid });
    return u.uid;
  }, [user]);

  const handleNotification = (notification) => {
    console.log('*** fire notification:', notification.request.content.body);
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
    if (!active) return;
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    // console.log('*** hour changes: ', time, date, uid);
     scheduleNotification(uid, date, time);
  }, [active, notificationPermissions, time, date, uid]);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
