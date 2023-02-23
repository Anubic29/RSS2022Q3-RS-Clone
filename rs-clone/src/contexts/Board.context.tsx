/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { useContext, createContext, useState, useMemo, useCallback } from 'react';
import api from '../api';
import ColumnProjectType from '../types/project/columnProjectType';
import ProjectType from '../types/project/projectType';
import TaskType from '../types/task/taskType';
import UserType from '../types/user/userType';

import {
  TaskDataToUpdate,
  ColumnDataToUpdate,
  ProjectDataToUpdate,
  UserDataForAvatar,
  BoardContextType
} from './interfaces';

export const BoardContext = createContext<BoardContextType>({
  setProjectDataBack: () => Promise.resolve(null),
  setTasksDataBack: () => Promise.resolve(false),
  setUsersDataBack: () => Promise.resolve(false),
  getUserList: () => [],
  projectInfo: null,
  updateProject: () => Promise.resolve(false),
  deleteProject: () => Promise.resolve(false),
  addUserToTeam: () => Promise.resolve(false),
  setSearchInputValue: () => {},
  addUserFilter: () => {},
  deleteUserFilter: () => {},
  getTaskList: () => [],
  getColumnList: () => [],
  getColumnCount: () => 0,
  getFullNameUser: () => ({ firstName: '', lastName: '' }),
  createTask: () => Promise.resolve(false),
  updateTask: () => Promise.resolve(false),
  deleteTask: () => Promise.resolve(false),
  deleteAllTaskInColumn: () => Promise.resolve(false),
  moveTasksToColumn: () => Promise.resolve(false),
  createColumn: () => Promise.resolve(false),
  updateColumn: () => Promise.resolve(false),
  deleteColumn: () => Promise.resolve(false),
  swapColumn: () => Promise.resolve(false)
});

export const BoardProvider = (props: { children: React.ReactNode }) => {
  const [userList, setUserList] = useState<UserType[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectType | null>(null);
  const [columnList, setColumnList] = useState<ColumnProjectType[]>([]);
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const [userListFilter, setUserListFilter] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const setProjectDataBack = useCallback(async (ProjectId: string) => {
    const response = await api.projects.getData(ProjectId);
    setProjectInfo(response.data);
    setColumnList(response.data.columnList);
    return response.data;
  }, []);

  const setTasksDataBack = useCallback(
    async (ProjectId: string) => {
      const response = await api.tasks.getAllData(`?project=${ProjectId}`);
      setTaskList(response.data);
      return true;
    },
    [projectInfo]
  );

  const setUsersDataBack = useCallback(
    async (usersId: string[]) => {
      const users = await Promise.all(usersId.map((user) => api.users.getData(user)));
      setUserList(users.map((data) => data.data));
      return true;
    },
    [projectInfo]
  );

  const getUserList = useCallback(() => {
    return userList;
  }, [userList]);

  const updateProject = useCallback(
    async (updateData: ProjectDataToUpdate) => {
      if (projectInfo) {
        const payload = {
          title: updateData.title ?? projectInfo.title,
          description: updateData.description ?? projectInfo.description,
          boardTitle: updateData.boardTitle ?? projectInfo.boardTitle,
          color: updateData.color ?? projectInfo.color,
          key: updateData.key ?? projectInfo.key,
          author: updateData.author ?? projectInfo.author,
          pathImage: updateData.pathImage ?? projectInfo.pathImage
        };
        const response = await api.projects.updateData(projectInfo._id, payload);
        if (response.status === 200) {
          setProjectInfo(response.data);
          return true;
        }
      }
      return false;
    },
    [projectInfo]
  );

  const deleteProject = useCallback(async () => {
    if (projectInfo) {
      const resp = await api.tasks.deleteAllDataByProject(projectInfo._id);
      if (resp.status === 200 && resp.data) {
        const response = await api.projects.deleteData(projectInfo._id);
        if (response.status === 200 && response.data) {
          return true;
        }
      }
    }
    return false;
  }, [projectInfo]);

  const addUserToTeam = useCallback(
    async (_id: string) => {
      if (projectInfo) {
        const response = await api.projects.postTeamData(projectInfo._id, { userId: _id });
        if (response.status === 200) {
          projectInfo.team = response.data;
          const usersId = [projectInfo.author, ...response.data];
          const users = await Promise.all(usersId.map((user) => api.users.getData(user)));
          setProjectInfo(projectInfo);
          setUserList(users.map((data) => data.data));
          return true;
        }
      }
      return false;
    },
    [projectInfo, userList]
  );

  const addUserFilter = useCallback(
    (_id: string) => {
      setUserListFilter([...userListFilter, _id]);
    },
    [userListFilter]
  );

  const deleteUserFilter = useCallback(
    (_id: string) => {
      setUserListFilter(userListFilter.filter((data) => data !== _id));
    },
    [userListFilter]
  );

  const setSearchInputValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const getTaskList = useCallback(() => {
    let res = taskList.filter((data) => data.title.includes(searchValue));
    if (userListFilter.length > 0)
      res = res.filter((data) => userListFilter.includes(data.executor));
    return res;
  }, [taskList, userListFilter, searchValue]);

  const getColumnList = useCallback(() => {
    console.log(columnList);
    return columnList;
  }, [columnList]);

  const getColumnCount = useCallback(() => {
    return columnList.length;
  }, [columnList]);

  const getFullNameUser = useCallback(
    (_id: string) => {
      const user = userList.find((data) => data._id === _id);
      if (user) {
        return {
          firstName: user.firstName,
          lastName: user.lastName
        } as UserDataForAvatar;
      }
    },
    [userList]
  );

  const createTask = useCallback(
    async (columnId: string, taskTitle: string, currUserId: string, userId?: string) => {
      if (projectInfo) {
        const payload = {
          title: taskTitle,
          description: '',
          author: currUserId,
          executor: userId ?? 'auto',
          projectId: projectInfo._id,
          columnId: columnId
        };
        const response = await api.tasks.postData(payload);
        if (response.status === 200) {
          setTaskList([...taskList, response.data]);
          return true;
        }
      }
      return false;
    },
    [taskList, projectInfo]
  );

  const updateTask = useCallback(
    async (_id: string, updateData: TaskDataToUpdate) => {
      const idx = taskList.findIndex((data) => data._id === _id);

      const payload = {
        title: updateData.title ?? taskList[idx].title,
        description: updateData.description ?? taskList[idx].description,
        author: updateData.author ?? taskList[idx].author,
        executor: updateData.executor ?? taskList[idx].executor,
        projectId: updateData.projectId ?? taskList[idx].projectId,
        columnId: updateData.columnId ?? taskList[idx].columnId
      };
      const response = await api.tasks.updateData(_id, payload);

      if (response.status === 200) {
        taskList.splice(idx, 1, response.data);
        setTaskList([...taskList]);
        return true;
      }
      return false;
    },
    [taskList]
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      const response = await api.tasks.deleteData(taskId);

      if (response.status === 200 && response.data) {
        const idx = taskList.findIndex((data) => data._id === taskId);
        taskList.splice(idx, 1);

        setTaskList([...taskList]);
        return true;
      }
      return false;
    },
    [taskList]
  );

  const moveTasksToColumn = useCallback(
    async (currId: string, newId: string) => {
      const response = await api.tasks.updateAllDataColumn({ currId, newId });

      if (response.status === 200 && response.data) {
        const res = taskList.map((task) => {
          if (task.columnId === currId) task.columnId = newId;
          return task;
        });

        setTaskList(res);
        return true;
      }
      return false;
    },
    [taskList]
  );

  const deleteAllTaskInColumn = useCallback(
    async (_id: string) => {
      const response = await api.tasks.deleteAllDataByColumn(_id);
      if (response.status === 200 && response.data) {
        const res = taskList.filter((data) => data.columnId !== _id);
        setTaskList(res);
        return true;
      }
      return false;
    },
    [taskList]
  );

  const createColumn = useCallback(
    async (columnTitle: string) => {
      if (projectInfo) {
        const payload = {
          title: columnTitle,
          type: 'common'
        };
        const response = await api.projects.postColumnData(projectInfo._id, payload);

        if (response.status === 200) {
          setColumnList(response.data);
          return true;
        }
      }
      return false;
    },
    [columnList]
  );

  const updateColumn = useCallback(
    async (_id: string, updateData: ColumnDataToUpdate) => {
      if (projectInfo) {
        const idx = columnList.findIndex((data) => data._id === _id);

        const payload = {
          title: updateData.title ?? columnList[idx].title,
          type: updateData.type ?? columnList[idx].type
        };
        const response = await api.projects.updateColumnData(projectInfo._id, _id, payload);

        if (response.status === 200) {
          columnList.splice(idx, 1, response.data);
          setColumnList([...columnList]);
          return true;
        }
      }
      return false;
    },
    [columnList]
  );

  const deleteColumn = useCallback(
    async (_id: string) => {
      if (projectInfo) {
        const response = await api.projects.deleteColumnData(projectInfo._id, _id);

        if (response.status === 200 && response.data) {
          const idx = columnList.findIndex((data) => data._id === _id);
          columnList.splice(idx, 1);

          setColumnList([...columnList]);
          return true;
        }
      }
      return false;
    },
    [columnList]
  );

  const swapColumn = useCallback(
    async (_idActive: string, _id: string) => {
      if (projectInfo) {
        const activeIdx = columnList.findIndex((data) => data._id === _idActive);
        const overIdx = columnList.findIndex((data) => data._id === _id);
        const activeColumn = columnList.splice(activeIdx, 1)[0];
        columnList.splice(activeIdx > overIdx ? overIdx : overIdx - 1, 0, activeColumn);
        const response = await api.projects.updateAllColumnData(projectInfo._id, { columnList });

        if (response.status === 200) {
          setColumnList(response.data);
          return true;
        }
      }
      return false;
    },
    [columnList]
  );

  const values = useMemo(
    () => ({
      setProjectDataBack,
      setTasksDataBack,
      setUsersDataBack,
      getUserList,
      projectInfo,
      updateProject,
      deleteProject,
      addUserToTeam,
      setSearchInputValue,
      addUserFilter,
      deleteUserFilter,
      getTaskList,
      getColumnList,
      getColumnCount,
      getFullNameUser,
      createTask,
      updateTask,
      deleteTask,
      deleteAllTaskInColumn,
      moveTasksToColumn,
      createColumn,
      updateColumn,
      deleteColumn,
      swapColumn
    }),
    [
      setProjectDataBack,
      setTasksDataBack,
      setUsersDataBack,
      getUserList,
      projectInfo,
      updateProject,
      deleteProject,
      addUserToTeam,
      setSearchInputValue,
      addUserFilter,
      deleteUserFilter,
      getTaskList,
      getColumnList,
      getColumnCount,
      getFullNameUser,
      createTask,
      updateTask,
      deleteTask,
      deleteAllTaskInColumn,
      moveTasksToColumn,
      createColumn,
      updateColumn,
      deleteColumn,
      swapColumn
    ]
  );

  return <BoardContext.Provider value={values}>{props.children}</BoardContext.Provider>;
};

export const useBoard = () => {
  return useContext(BoardContext);
};
