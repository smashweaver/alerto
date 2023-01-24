import React, { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Appearance } from 'react-native';
import { useApi, useAuth, useFirebase, useNotification } from '../hooks';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const today = new Date();
  const [colorScheme, setScheme] = useState(Appearance.getColorScheme());
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(format(today, 'yyyy-MM-dd'));
  const [hour, setHour] = useState(today.getHours());
  const [minutes, setMinutes] = useState(today.getMinutes());
  const [time, setTime] = useState(0);
  const [profile, setProfile] = useState(null);
  // const [active, setActive] = useState(null);

  const { db, createStream  } = useFirebase();

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
    saveProfile,
    getProfile,
    setProfileSchedule,
    updateProfileEvents,
  } = useApi(db);

  const notify = useNotification({ getEventsForNotification });

  const refreshProfile = async (uid) => {
    const userProfile = await getProfile(uid);
    console.log('*** user profile refreshed:', userProfile);
    setProfile(userProfile);
  };

  const updateProfileSchedule = (uid, code) => {
    setProfileSchedule(uid, code);
    refreshProfile(uid);
  }

  const setupUser = async (userData) => {
    if (userData) {
      const { uid } = userData;
      console.log('*** user id:', uid);

      const userProfile = await getProfile(uid);
      /*
      if (!userProfile.schedule) {
        setProfileSchedule(uid, 'everyman');
        userProfile = await getProfile(uid);
      }
      console.log('*** profile: ', userProfile);
      */

      setProfile(userProfile);
    }

    setUser(userData);
  };

  const {
    registerUser,
    signInUser,
    signOutUser,
  } = useAuth(setupUser);

  const phoneThemeChanged = (theme) => {
    // console.log('*** Appearance.changeListener\n', JSON.stringify(theme, null, 2));
    setScheme(theme.colorScheme);
  };

  // todo: this must be a background task
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
      min = min - (min % 5);

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
    const min = minutes - (minutes % 5);
    const newTime = (hour * 60) + min;

    if (time !== newTime) {
      console.log('*** time changed:', { hour, min, newTime });
      setTime(newTime);
    }
  }, [hour, minutes]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(phoneThemeChanged);
    return () => subscription.remove();
  }, [setScheme])

  useEffect(() => {
    console.log('*** phone theme changed:', { colorScheme });
  }, [colorScheme]);

  const value = {
    user,
    profile,
    time,
    date,
    colorScheme,

    auth: {
      registerUser,
      signInUser,
      signOutUser,
    },

    api: {
      createScheduleFromTemplate,
      getScheduleQuery,
      getEventsByDate,
      createWeekendSchedule,
      removeEventById,
      createEvent,
      updateEvent,
      retrieveEventById,
      saveProfile,
      refreshProfile,
      setProfileSchedule,
      updateProfileEvents,
      updateProfileSchedule,
    },

    phone: { notify },

    stream: { createStream  }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
