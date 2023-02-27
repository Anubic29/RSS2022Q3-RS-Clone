import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import api from '../api';
import CurrentUserType from '../types/user/currentUserType';
import NotedItemUserType from '../types/user/notedItemUserType';

interface UserContextType {
  currentUser: CurrentUserType | undefined;
  notedItemList: NotedItemUserType[];
  recentList: string[];
  getNotedItemList: (type: 'task' | 'project') => NotedItemUserType[];
  isNotedItem: (id: string) => boolean;
  addNotedItem: (id: string, type: string) => Promise<boolean>;
  deleteNotedItem: (id: string) => Promise<boolean>;
  visitProject: (projectId: string) => Promise<boolean>;
  deleteRecentProject: (projectId: string) => void;
  setUserDataBack: () => void | Promise<number | undefined>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  notedItemList: [],
  recentList: [],
  getNotedItemList: () => [],
  isNotedItem: () => false,
  addNotedItem: () => Promise.resolve(false),
  deleteNotedItem: () => Promise.resolve(false),
  setUserDataBack: () => undefined,
  visitProject: () => Promise.resolve(false),
  deleteRecentProject: () => console.log('error')
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>();
  const [notedItemList, setNotedItemList] = useState<NotedItemUserType[]>([]);
  const [recentList, setRecentList] = useState<string[]>([]);

  // useEffect(() => console.log(recentList), [recentList]);

  const setUserDataBack = useCallback(async () => {
    try {
      const response = await api.users.getCurrentData();
      if (response.status === 200) {
        setCurrentUser(response.data);
        setNotedItemList(response.data.notedItems);
        setRecentList(response.data.recentProjects);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.status;
      } else {
        console.log('Unexpected error', error);
      }
    }
    // if (response.status === 403) {
    //   Promise.reject();
    // }
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

  const visitProject = useCallback(
    async (projectId: string) => {
      if (currentUser) {
        const response = await api.users.postVisitProject(currentUser._id, { projectId });
        if (response.status === 200) {
          setRecentList(response.data);
          return true;
        }
      }
      return false;
    },
    [currentUser]
  );

  const deleteRecentProject = useCallback((projectId: string) => {
    setRecentList((prev) => prev.filter((project) => project !== projectId));
  }, []);

  const values = useMemo(
    () => ({
      currentUser,
      notedItemList,
      recentList,
      getNotedItemList,
      isNotedItem,
      addNotedItem,
      deleteNotedItem,
      setUserDataBack,
      visitProject,
      deleteRecentProject
    }),
    [
      currentUser,
      notedItemList,
      recentList,
      getNotedItemList,
      isNotedItem,
      addNotedItem,
      deleteNotedItem,
      setUserDataBack,
      visitProject,
      deleteRecentProject,
      setUserDataBack
    ]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
