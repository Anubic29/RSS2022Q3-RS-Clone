import React from 'react';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import api from '../api';
import CurrentUserType from '../types/user/currentUserType';
import NotedItemUserType from '../types/user/notedItemUserType';
import { ACCESS_TOKEN, BASE_URL } from '../api/config';
import UserType from '../types/user/userType';

interface UserContextType {
  currentUser: CurrentUserType | undefined;
  notedItemList: NotedItemUserType[];
  addNotedItem: (id: string, type: string) => Promise<boolean>;
  deleteNotedItem: (id: string) => Promise<boolean>;
  setUserDataBack: () => void;
  getUsers: () => Promise<UserType[]>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  notedItemList: [],
  addNotedItem: () => Promise.resolve(false),
  deleteNotedItem: () => Promise.resolve(false),
  setUserDataBack: () => undefined,
  getUsers: () => Promise.resolve([])
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

  const getUsers = async () => {
    const fetchedUsers = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    return await fetchedUsers.json();
  };

  const values = useMemo(
    () => ({
      currentUser,
      notedItemList,
      addNotedItem,
      deleteNotedItem,
      setUserDataBack,
      getUsers
    }),
    [currentUser, notedItemList, addNotedItem, deleteNotedItem, setUserDataBack, getUsers]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
