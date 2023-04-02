import React, { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Appearance, AppState } from 'react-native';
import { useApi, useAuth, useFirebase, useNotification } from '../hooks';
import { normalizeMin } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
  // scheduleNotification();

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

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
  const [features] = useState({ surveyEnabled: true });
  const [appState, setAppState] = useState(null);

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
    getProfile,
    setProfileSchedule,
    setProfileEvents,
    setProfileSurvey,
  } = useApi(db);

  const notify = useNotification({ getEventsForNotification });

  const onUserChanged = async (userData) => {
    const email = userData && userData.email || null;
    console.log('*** user:', email);
    if (userData) {
      const { uid } = userData;
      const userProfile = await getProfile(uid);
      setProfile(userProfile);
      await AsyncStorage.setItem('uid', uid);
    } else {
      await AsyncStorage.removeItem('uid');
    }
    setUser(userData);
  };

  const [
    isAuthReady,
    {
      registerUser,
      signInUser,
      signOutUser,
    }
  ] = useAuth({ onUserChanged });

  const phoneThemeChanged = (theme) => {
    // console.log('*** Appearance.changeListener\n', JSON.stringify(theme, null, 2));
    setScheme(theme.colorScheme);
  };

  const appStateChanged = (newAppState) => {
    console.log('*** app state:', newAppState);
    setAppState(newAppState);
    if (newAppState === 'background') {
      // register
    } else {
      // unregister
    }
  };

  const refreshProfile = async (uid) => {
    const userProfile = await getProfile(uid);
    console.log('*** user profile refreshed:', userProfile);
    setProfile(userProfile);
  };

  const updateProfileSchedule = async (uid, code, custom=[]) => {
    await setProfileSchedule(uid, code, custom)
    await refreshProfile(uid);
  };

  const updateProfileEvents = async (uid, events) => {
    await setProfileEvents(uid, events)
    await refreshProfile(uid);
  };

  const updateProfileSurvey = async (uid, survey) => {
    console.log('*** updating profile survey result');
    await setProfileSurvey(uid, survey);
    await refreshProfile(uid);
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
      const min = normalizeMin(d.getMinutes());

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

    const themeListener = Appearance.addChangeListener(phoneThemeChanged);
    const stateListener = AppState.addEventListener('change', appStateChanged);

    AppState.add

    return () => {
      clearInterval(timer);
      themeListener.remove();
      stateListener.remove();
    }
  }, []);

  useEffect(() => {
    const min = minutes - (minutes % 5);
    const newTime = (hour * 60) + min;

    if (time !== newTime) {
      console.log('*** time changed:', { hour, min, newTime });
      setTime(newTime);
    }
  }, [time, hour, minutes]);

  /* useEffect(() => {
    const subscription = Appearance.addChangeListener(phoneThemeChanged);
    return () => subscription.remove();
  }, [setScheme]) */

  useEffect(() => {
    console.log('*** phone theme changed:', { colorScheme });
  }, [colorScheme]);

  const value = {
    user,
    profile,
    time,
    date,
    colorScheme,
    features,
    appState,

    auth: {
      isAuthReady,
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
      updateProfileSchedule,
      updateProfileEvents,
      updateProfileSurvey,
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
