import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setUser(u);
      setIsUserVerified(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{user, isUserVerified }}>
      {children}
    </AuthContext.Provider>
  );
};
