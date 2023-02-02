import React, { useContext, useEffect, useMemo, useState } from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AppContext } from '../contexts/appContext';
import { createTheme } from '../themes';

export default function Main() {
  const { user, date, time, phone, profile } = useContext(AppContext);
  const theme = createTheme();

  const uid = useMemo(() => {
    const u = user || { uid: null };
    // console.log('*** memoizing uid:', { uid: u.uid });
    return u.uid;
  }, [user]);

  useEffect(() => {
    console.log('*** mounting Main');
    return () => console.log('*** unmounting Main');
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
