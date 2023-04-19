import React, { createContext, useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { Appearance, AppState } from 'react-native';
import { useApi, useAuth, useFirebase, useNotification } from '../hooks';
import { formatDateTime, normalizeMin } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import uuid from 'react-native-uuid';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

import { getEventsToNotify, scheduleBackgroundNotifications } from './events';
const BACKGROUND_TASK_NAME = 'background-fetch';
const TICKER_INTERVAL = 5000;

TaskManager.defineTask(BACKGROUND_TASK_NAME, async (taskData) => {
  const now = Date.now();

  // scheduleNotification();
  const uid = await AsyncStorage.getItem('uid');
  console.log(`*** [${Device.osName}] BACKGROUND FETCHING:  ${formatDateTime(new Date())}  uid:${uid}`);
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
  const timer = useRef(null);

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
    console.log(`*** [${Device.osName}] app state: ${newAppState}   ${formatDateTime(new Date())}`);
    setAppState(newAppState);
    await Notifications.cancelAllScheduledNotificationsAsync();
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

  const ticker = () => {
    const d = new Date();

    const heartbeat = formatDateTime(d);
    console.log(`*** [${Device.osName}] TICKER:`, { heartbeat, hour, minutes })

    const fd = format(d, 'yyyy-MM-dd');
    if (fd !== date) {
      setDate(fd);
      setHour(0);
      setMinutes(0);
      console.log(`*** [${Device.osName}]  TIME:`, { heartbeat, hr:0, min:0 })
      return;
    }

    const hr = d.getHours();
    const min = normalizeMin(d.getMinutes());

    if (hr !== hour) {
      setHour(hr);
      setMinutes(0);
      console.log(`*** [${Device.osName}] TIME:`, { heartbeat, hr, min:0 })
      return;
    }

    if (min !== minutes) {
      setMinutes(min);
      console.log(`*** [${Device.osName}] TIME:`, { heartbeat, hr, min })
    }
  };

  // todo: this must be a background task
  useEffect(() => {
    const themeListener = Appearance.addChangeListener(phoneThemeChanged);
    const stateListener = AppState.addEventListener('change', appStateChanged);
    timer.current = setInterval(ticker, TICKER_INTERVAL);

    return () => {
      clearInterval(timer.current);
      themeListener.remove();
      stateListener.remove();
    }
  }, []);

  const enableKeepAwake = async () => {
    await activateKeepAwakeAsync();
  };

  useEffect(() => {
    console.log(`*** [${Device.osName}]`, appState);
    if (appState === 'background') {
      clearInterval(timer.current);
      enableKeepAwake();
    }
    if (appState === 'active') {
      timer.current = setInterval(ticker, TICKER_INTERVAL);
      deactivateKeepAwake();
    }
  }, [appState]);

  const processTime = (hour, minutes) => {
    const min = minutes - (minutes % 5);
    const newTime = (hour * 60) + min;

    if (time !== newTime) {
      console.log(`*** [${Device.osName}] time changed:`, { newTime });
      setTime(newTime);
    }
  };

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
