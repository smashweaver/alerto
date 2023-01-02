import React, { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getAuth, getEventsForNotification } from './firebase';
import { PermissionStatus } from 'expo-modules-core';
// import { debounce } from 'lodash';
import * as Notifications from 'expo-notifications';
import { Appearance, useColorScheme } from 'react-native';
// import { Appearance } from 'react-native-appearance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [colorScheme, setScheme] = useState(Appearance.getColorScheme());
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [hour, setHour] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(null);
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
  const scheduleNotification = async (notifyUserId, notifyDate, notifyStart) => {
    // console.log('*** schedule:', { notifyUserId, notifyDate, notifyHour, notificationPermissions});
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const event = await getEventsForNotification(notifyUserId, notifyDate, notifyStart);
    notify(event);
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

    const timer = setInterval(() => {
      const d = new Date();

      const fd = format(d, 'yyyy-MM-dd');
      if (fd !== date) {
        setDate(fd);
        setHour(0);
        setMinutes(0);
        return;
      }

      const hr = d.getHours();
      let min = d.getMinutes();
      min = min - (min % 15);

      console.log('*** heartbeat', { hr, min, hour, minutes })

      if (hr !== hour) {
        setHour(hr);
        setMinutes(0);
        return;
      }

      if (min !== minutes) {
        setMinutes(min);
      }
    }, 60000);

    return () => {
      clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    const min = minutes - (minutes % 15);
    const newTime = (hour * 60) + min;
    if (time !== newTime) {
      console.log('*** time changed:', { hour, min, newTime });
      setTime(newTime);
    }
  }, [hour, minutes]);

  useEffect(() => {
    console.log('*** setup Appearance listener');
    const subscription = Appearance.addChangeListener(
      (p) => {
        console.log('*** Appearance.changeListener\n', JSON.stringify(p, null, 2));
        const { colorScheme: scheme } = p;
        setScheme(scheme);
      },
    );

    return () => {
      subscription.remove()
    }
  }, [setScheme])

  useEffect(() => {
    console.log('***', { colorScheme });
  }, [colorScheme]);

  const value = {
    user,
    time,
    date,
    active,
    notificationPermissions,
    colorScheme,
    setActive,
    scheduleNotification,
  };

  return (
    <AuthContext.Provider value={{...value}}>
      {children}
    </AuthContext.Provider>
  );
};
