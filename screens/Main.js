import React, { useContext, useEffect, useMemo, useState } from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AppContext } from '../contexts/appContext';

export default function Main() {
  const { user, date, time, phone } = useContext(AppContext);

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
     console.log('*** notify: ', time, date, uid);
     phone.notify(uid, date, time);
  }, [time, date, uid]);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
