import React, { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getAuth } from './firebase';
import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [hour, setHour] = useState(new Date().getHours());
  const [notificationPermissions, setNotificationPermissions] = useState(PermissionStatus.UNDETERMINED);

  const requestNotificationPermissions = () => {
    const setStatus = status => setNotificationPermissions(status)
    Notifications.requestPermissionsAsync().then(setStatus);
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
    <AuthContext.Provider value={{ user, hour, date, notificationPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};
