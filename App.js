import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthProvider } from './contexts/Authentication';
import Auth from './screens/Auth';
import Main from './screens/Main';
import * as SplashScreen from 'expo-splash-screen';

const Screen = () => {
  const [view, setView] = useState(null);
  const { user, isUserVerified } = useContext(AuthContext);

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    if (!isUserVerified) return;

    SplashScreen.hideAsync();

    if (user) {
      setView(<Main />);
    } else {
      setView(<Auth />)
    }
  }, [isUserVerified, user]);

  return view;
};

export default function App() {
  return (
    <AuthProvider>
      <Screen/>
    </AuthProvider>
  )
}
