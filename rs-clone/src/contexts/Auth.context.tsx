import React, { useCallback } from 'react';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface AuthContextType {
  token: string;
  setTokenData: (newToken: string) => void;
  removeTokenData: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: '',
  setTokenData: () => console.log('error'),
  removeTokenData: () => console.log('error')
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState('');

  const setTokenData = useCallback((newToken: string) => {
    setToken(newToken);
    localStorage.setItem('accessToken', newToken);
  }, []);

  const removeTokenData = useCallback(() => {
    setToken('');
    localStorage.removeItem('accessToken');
  }, []);

  const values = useMemo(
    () => ({
      token,
      setTokenData,
      removeTokenData
    }),
    [token, setTokenData, removeTokenData]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
