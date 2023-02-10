import { createContext, Dispatch, SetStateAction } from 'react';

export const IsAuthContex = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {
    return false;
  }
});
