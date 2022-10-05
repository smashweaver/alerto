import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext, AuthProvider } from './contexts/Authentication';
import Login from './screens/Login';
import Main from './screens/Main';
import AppStyle from './styles/AppStyle';

const Screen = () => {
  const { user } = useContext(AuthContext);
  const [view, setView] = useState(<Login />);

  useEffect(() => {
    if (user) {
      setView(<Main />);
    } else {
      setView(<Login />)
    }
  }, [user]);

  return view;
};

export default function App() {
  return (
    <AuthProvider>
      <Screen />
    </AuthProvider>
  )
}
