import React, { useContext, useEffect, useMemo, useState } from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AppContext } from '../contexts/appContext';
import { createTheme } from '../themes';
import * as BackgroundFetch from 'expo-background-fetch';
import { formatDateTime } from '../utils';

const BACKGROUND_TASK_NAME = 'background-fetch';

async function registerBackgroundFetchAsync() {
  console.log('*** register background task:', formatDateTime(new Date()));
  return await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
    minimumInterval: 60, // 5 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
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
    () =>  unregisterBackgroundFetchAsync();
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
