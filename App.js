import React from 'react';
import Login from './screens/Login';
import AppStyle from './styles/AppStyle';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  // const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider style={AppStyle.container}>
      <Login />
    </SafeAreaProvider>
  )
}
