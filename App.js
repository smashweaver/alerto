import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppContext, AppProvider } from './contexts/appContext';
import Auth from './screens/Auth';
import Main from './screens/Main';
import * as SplashScreen from 'expo-splash-screen';

const Screen = () => {
  const [view, setView] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    SplashScreen.hideAsync();

    if (!user) {
      setView(<Auth />)
    } else {
      setView(<Main />);
    }
  }, [user]);

  return view;
};

export default function App() {
  return (
    <AppProvider>
      <StatusBar style='light' />
      <Screen/>
    </AppProvider>
  )
}
