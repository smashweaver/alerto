import React, { useContext, useEffect, useMemo, useState } from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AppContext } from '../contexts/appContext';
import { createTheme } from '../themes';
import * as BackgroundFetch from 'expo-background-fetch';

const BACKGROUND_FETCH_TASK = 'background-fetch';

async function registerBackgroundFetchAsync() {
  console.log('*** register background task');
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 3, // 5 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  console.log('*** unregister background task');
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
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
    //console.log('*** notify: ', time, date, uid);
    phone.notify(uid, date, time);
  }, [time, date, uid, profile.schedule]);

  return (
    <NavigationContainer theme={theme}>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
