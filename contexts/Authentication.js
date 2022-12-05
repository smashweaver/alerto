import React, { createContext, useEffect, useState } from 'react';
import { getAuth } from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(u => {
      console.log('*** onAuthStateChanged\n', JSON.stringify(u, null, 2));
      setUser(u);
    });
  }, []);

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  );
};
