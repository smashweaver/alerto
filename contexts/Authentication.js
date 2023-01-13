import React, { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Appearance } from 'react-native';
import { useApi, useAuth, useNotification, useFirebase } from '../hooks';
import { firebaseConfig } from '../constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const today = new Date();
  const [colorScheme, setScheme] = useState(Appearance.getColorScheme());
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(format(today, 'yyyy-MM-dd'));
  const [hour, setHour] = useState(today.getHours());
  const [minutes, setMinutes] = useState(today.getMinutes());
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(null);

  const {
    app,
    db,
    observer,
  } = useFirebase(firebaseConfig);

  const {
    createScheduleFromTemplate,
    getScheduleQuery,
    getEventsForNotification,
    getEventsByDate,
    createWeekendSchedule,
    removeEventById,
    createEvent,
    updateEvent,
    retrieveEventById,
  } = useApi(db);

  const {
    registerUser,
    signInUser,
    signOutUser,
  } = useAuth({ setUser });

  const phoneThemeChanged = (theme) => {
    // console.log('*** Appearance.changeListener\n', JSON.stringify(theme, null, 2));
    setScheme(theme.colorScheme);
  };

  useEffect(() => {
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
    const subscription = Appearance.addChangeListener(phoneThemeChanged);
    return () => {
      subscription.remove()
    }
  }, [setScheme])

  useEffect(() => {
    console.log('*** phone theme changed:', { colorScheme });
  }, [colorScheme]);

  const value = {
    user,
    time,
    date,
    active,
    colorScheme,
    setActive,

    auth: {
      registerUser,
      signInUser,
      signOutUser,
    },

    api: {
      createScheduleFromTemplate,
      getScheduleQuery,
      getEventsForNotification,
      getEventsByDate,
      createWeekendSchedule,
      removeEventById,
      createEvent,
      updateEvent,
      retrieveEventById,
    },

    stream: {
      observer,
    }
  };

  return (
    <AuthContext.Provider value={{...value}}>
      {children}
    </AuthContext.Provider>
  );
};
