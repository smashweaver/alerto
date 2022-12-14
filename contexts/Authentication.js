import React, { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getAuth, getEventsForNotification } from './firebase';
import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [hour, setHour] = useState(new Date().getHours());
  const [notificationPermissions, setNotificationPermissions] = useState(PermissionStatus.UNDETERMINED);

  const requestNotificationPermissions = () => {
    const setStatus = p => {
      setNotificationPermissions(p.status);
    };
    Notifications.requestPermissionsAsync().then(setStatus);
  };

  const notify = (data) => {
    if (!data) return;

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

  // todo: this should be a background task
  const scheduleNotification = (notifyUserId, notifyDate, notifyHour) => {
    // console.log('*** schedule:', { notifyUserId, notifyDate, notifyHour, notificationPermissions});
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    getEventsForNotification(notifyUserId, notifyDate, notifyHour)
    .then(x => notify(x));
  };

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(u => {
      // console.log('*** onAuthStateChanged\n', JSON.stringify(u, null, 2));
      if (!u) {
        console.log('*** user is signed out');
      } else {
        console.log('*** user is signed in');
      }
      setUser(u);
    });

    requestNotificationPermissions();

    let timer = setInterval(() => {
      const d = new Date();

      const fd = format(d, 'yyyy-MM-dd');
      if (fd !== date) setDate(fd);

      const hr = d.getHours();
      if (hr !=- hour) setHour(hr);
    }, 60000);

    return () => {
      clearInterval(timer);
      timer = 0;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, hour, date, notificationPermissions, scheduleNotification }}>
      {children}
    </AuthContext.Provider>
  );
};
