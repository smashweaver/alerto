import React, { createContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getAuth } from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(u => {
      // console.log('*** onAuthStateChanged\n', JSON.stringify(u, null, 2));
      if (!u) {
        console.log('*** user is signed out');
      } else {
        console.log('*** user is signed in');
      }
      setUser(u);
    });

    let timer = setInterval(() => {
      // console.log('*** check date!')
      const fd = format(new Date(), 'yyyy-MM-dd');
      if (fd !== date) setDate(fd);
    }, 60000);

    return () => {
      clearInterval(timer);
      timer = 0;
    }
  }, []);

  return (
    <AuthContext.Provider value={{user, date}}>
      {children}
    </AuthContext.Provider>
  );
};
