import React, { useContext, useEffect, useMemo } from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AppContext } from '../contexts/appContext';
import { createTheme } from '../themes';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import { formatDateTime } from '../utils';

const BACKGROUND_TASK_NAME = 'background-fetch';
const MINIMIMUM_INTERVAL = 120;

async function registerBackgroundFetchAsync() {
  await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
  const status = await BackgroundFetch.getStatusAsync();
  const isBackgroundFetchAvailable = status === BackgroundFetch.BackgroundFetchStatus.Available;
  if (isBackgroundFetchAvailable) {
    // Register and implement your background task
    console.log('*** register background task:', formatDateTime(new Date()));

    return await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: MINIMIMUM_INTERVAL,
      stopOnTerminate: true, // android only,
      startOnBoot: false, // android only
    });
  } else {
    console.log('Background fetch is not available on this device');
  }
}

async function unregisterBackgroundFetchAsync() {
  console.log('*** unregister background task');
  return await BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK_NAME);
}

export default function Main() {
  const { appState, user, date, time, phone, profile } = useContext(AppContext);
  const theme = createTheme();

  const uid = useMemo(() => {
    const u = user || { uid: null };
    // console.log('*** memoizing uid:', { uid: u.uid });
    return u.uid;
  }, [user]);

  useEffect(() => {
    registerBackgroundFetchAsync();
    () =>  {
      unregisterBackgroundFetchAsync();
    }
  }, []);

  useEffect(() => {
    if (!uid) return;
    if (!profile.schedule) return;
    phone.notify(uid, date, time);
  }, [time, date, uid, profile.schedule]);

  return (
    <NavigationContainer theme={theme}>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
