import { createContext, Dispatch, SetStateAction } from 'react';

const hasToken = localStorage.getItem('accessToken');
export const IsAuthContex = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {
    return Boolean(hasToken);
  }
});
