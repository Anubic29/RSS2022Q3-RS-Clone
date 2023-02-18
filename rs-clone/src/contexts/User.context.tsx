import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import api from '../api';
import CurrentUserType from '../types/user/currentUserType';
import NotedItemUserType from '../types/user/notedItemUserType';

interface UserContextType {
  currentUser: CurrentUserType | undefined;
  notedItemList: NotedItemUserType[];
  setUserDataBack: () => void;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  notedItemList: [],
  setUserDataBack: () => undefined
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>();
  const [notedItemList, setNotedItemList] = useState<NotedItemUserType[]>([]);

  const setUserDataBack = useCallback(async () => {
    const response = await api.users.getCurrentData();
    if (response.status === 200) {
      setCurrentUser(response.data);
      setNotedItemList(response.data.notedItems);
    }
  }, []);

  const values = useMemo(
    () => ({
      currentUser,
      notedItemList,
      setUserDataBack
    }),
    [currentUser, notedItemList, setUserDataBack]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
