import React, { createContext, useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Appearance, AppState } from 'react-native';
import { useApi, useAuth, useFirebase, useNotification } from '../hooks';
import { formatDateTime, normalizeMin } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import uuid from 'react-native-uuid';
import * as Notifications from 'expo-notifications';

import { getEventsToNotify, scheduleBackgroundNotifications } from './events';
const BACKGROUND_TASK_NAME = 'background-fetch';

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  const now = Date.now();

  // scheduleNotification();
  const uid = await AsyncStorage.getItem('uid');
  console.log(`Got background fetch call at date: ${formatDateTime(new Date())}  uid:${uid}`);
  const events = await getEventsToNotify(uid);
  await scheduleBackgroundNotifications(events);

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
    setProfileDatedEvents,
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

  const appStateChanged = async (newAppState) => {
    console.log(`*** app state: ${newAppState}   ${formatDateTime(new Date())}`);
    setAppState(newAppState);
    if (newAppState !== 'background') {
      await Notifications.cancelAllScheduledNotificationsAsync();
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
    await setProfileSurvey(uid, survey);
    await refreshProfile(uid);
  };

  const addDatedEvent = async (uid, date, data) => {
    data.id =  uuid.v4();
    const profile = await getProfile(uid);
    const { dated } = profile;
    const events = dated[date] || [];
    dated[date] = [...events, data];
    await setProfileDatedEvents(uid, { dated });
    await refreshProfile(uid);
  };

  const removeDatedEvent = async(uid, id, date) => {
    const profile = await getProfile(uid);
    const { dated } = profile;
    const events = (dated[date] || []).filter(x => x.id !== id);
    dated[date] = [...events];
    await setProfileDatedEvents(uid, { dated });
    await refreshProfile(uid);
  };

  const updateDatedEvent = async(uid, id, date, data) => {
    const profile = await getProfile(uid);
    const { dated } = profile;
    const targetEvent = (dated[date] || []).find(x => x.id === id);
    const events = (dated[date] || []).filter(x => x.id !== id);
    dated[date] = [...events, { ...targetEvent, ...data }];
    await setProfileDatedEvents(uid, { dated });
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

    return () => {
      clearInterval(timer);
      themeListener.remove();
      stateListener.remove();
    }
  }, []);

  const processTime = useCallback((hour, minutes) => {
    const min = minutes - (minutes % 5);
    const newTime = (hour * 60) + min;

    if (time !== newTime) {
      console.log('*** time changed:', { newTime });
      setTime(newTime);
    }
  }, [time]);

  useEffect(() => {
    processTime(hour, minutes);
  }, [hour, minutes]);

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
      addDatedEvent,
      removeDatedEvent,
      updateDatedEvent,
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
