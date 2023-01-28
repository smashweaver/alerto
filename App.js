import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppContext, AppProvider } from './contexts/appContext';
import Auth from './screens/Auth';
import Main from './screens/Main';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Screen = () => {
  const [AppView, setView] = useState(null);
  const { user, auth: { isAuthReady } } = useContext(AppContext);

  useEffect(() => {
    console.log('*** isAuthReady changed:', isAuthReady);
    if (isAuthReady) SplashScreen.hideAsync();
  }, [isAuthReady]);

  useEffect(() => {
    if (!user) {
      setView(<Auth />)
    } else {
      setView(<Main />);
    }
  }, [user]);

  return AppView;
};

export default function App() {
  return (
    <AppProvider>
      <StatusBar style='light' />
      <Screen/>
    </AppProvider>
  )
}
