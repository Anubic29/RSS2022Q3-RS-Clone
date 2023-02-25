import React from 'react';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import api from '../api';
import CurrentUserType from '../types/user/currentUserType';
import NotedItemUserType from '../types/user/notedItemUserType';

interface UserContextType {
  currentUser: CurrentUserType | undefined;
  notedItemList: NotedItemUserType[];
  getNotedItemList: (type: 'task' | 'project') => NotedItemUserType[];
  isNotedItem: (id: string) => boolean;
  addNotedItem: (id: string, type: string) => Promise<boolean>;
  deleteNotedItem: (id: string) => Promise<boolean>;
  setUserDataBack: () => void;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  notedItemList: [],
  getNotedItemList: () => [],
  isNotedItem: () => false,
  addNotedItem: () => Promise.resolve(false),
  deleteNotedItem: () => Promise.resolve(false),
  setUserDataBack: () => undefined
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>();
  const [notedItemList, setNotedItemList] = useState<NotedItemUserType[]>([]);

  const setUserDataBack = useCallback(async () => {
    const response = await api.users.getCurrentData();
    if (response.status === 200) {
      console.log(response);
      setCurrentUser(response.data);
      setNotedItemList(response.data.notedItems);
    }
  }, []);

  const getNotedItemList = useCallback(
    (type: 'task' | 'project') => {
      return notedItemList.filter((data) => data.type === type);
    },
    [notedItemList]
  );

  const isNotedItem = useCallback(
    (id: string) => {
      return notedItemList.some((data) => data.id === id);
    },
    [notedItemList]
  );

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
        const response = await api.users.deleteNotedData(currentUser._id, id);

        if (response.status === 200 && response.data) {
          setNotedItemList((notedItemList) => notedItemList.filter((item) => item.id !== id));

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
      getNotedItemList,
      isNotedItem,
      addNotedItem,
      deleteNotedItem,
      setUserDataBack
    }),
    [
      currentUser,
      notedItemList,
      getNotedItemList,
      isNotedItem,
      addNotedItem,
      deleteNotedItem,
      setUserDataBack
    ]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
