import React from 'react';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import api from '../api';
import CurrentUserType from '../types/user/currentUserType';
import NotedItemUserType from '../types/user/notedItemUserType';

interface UserContextType {
  currentUser: CurrentUserType | undefined;
  notedItemList: NotedItemUserType[];
  addNotedItem: (id: string, type: string) => Promise<boolean>;
  deleteNotedItem: (id: string) => Promise<boolean>;
  setUserDataBack: () => void;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  notedItemList: [],
  addNotedItem: () => Promise.resolve(false),
  deleteNotedItem: () => Promise.resolve(false),
  setUserDataBack: () => undefined
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>();
  const [notedItemList, setNotedItemList] = useState<NotedItemUserType[]>([]);

  const setUserDataBack = useCallback(async () => {
    console.log('hffjhskhks');
    const response = await api.users.getCurrentData();
    console.log(response);
    if (response.status === 200) {
      setCurrentUser(response.data);
      setNotedItemList(response.data.notedItems);
    }
  }, []);

  const addNotedItem = useCallback(
    async (id: string, type: string) => {
      if (currentUser) {
        const response = await api.users.postNotedData(currentUser._id, { id, type });
        if (response.status === 200) {
          setNotedItemList(response.data);
          return true;
        }
      }
      return false;
    },
    [currentUser]
  );

  const deleteNotedItem = useCallback(
    async (id: string) => {
      if (currentUser) {
        const idx = notedItemList.findIndex((data) => data.id === id);
        const response = await api.users.deleteNotedData(currentUser._id, id);
        if (response.status === 200 && response.data) {
          notedItemList.splice(idx, 1);
          setNotedItemList(notedItemList);
          return true;
        }
      }
      return false;
    },
    [notedItemList, currentUser]
  );

  const values = useMemo(
    () => ({
      currentUser,
      notedItemList,
      addNotedItem,
      deleteNotedItem,
      setUserDataBack
    }),
    [currentUser, notedItemList, addNotedItem, deleteNotedItem, setUserDataBack]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
