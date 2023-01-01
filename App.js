import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthContext, AuthProvider } from './contexts/Authentication';
import Auth from './screens/Auth';
import Main from './screens/Main';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Screen = () => {
  const [view, setView] = useState(null);
  const { user } = useContext(AuthContext);

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
    <AuthProvider>
      <StatusBar style='light' />
      <Screen/>
    </AuthProvider>
  )
}
