import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      console.log('*** onAuthStateChanged', u);
      setUser(u);
    });
  }, []);

  return (
    <AuthContext.Provider value={{user }}>
      {children}
    </AuthContext.Provider>
  );
};
