import { useContext, createContext, useState, useMemo, useEffect, useCallback } from 'react';
import { projectData, taskListData, userListData } from '../Data/FakeProjectPageData';
import ColumnProjectType from '../Types/Project/ColumnProjectType';
import ProjectType from '../Types/Project/ProjectType';
import TaskType from '../Types/Task/TaskType';
import UserType from '../Types/User/UserType';

type TaskDataToUpdate = {
  title?: string;
  description?: string;
  author?: string;
  executor?: string;
  projectId?: string;
  columnId?: string;
};

type ProjectDataToUpdate = {
  title?: string;
  description?: string;
  key?: string;
  boardTitle?: string;
  author?: string;
  pathImage?: string;
};

export type UserDataForAvatar = {
  firstName: string;
  lastName: string;
};

interface BoardContextType {
  userList: UserType[];
  projectInfo: ProjectType | null;
  updateProject: (updateData: ProjectDataToUpdate) => void;
  setSearchInputValue: (value: string) => void;
  addUserFilter: (_id: string) => void;
  deleteUserFilter: (_id: string) => void;
  getTaskList: () => TaskType[];
  columnList: ColumnProjectType[];
  getFullNameUser: (_id: string) => UserDataForAvatar | undefined;
  createTask: (columnId: string, taskTitle: string) => void;
  updateTask: (_id: string, updateData: TaskDataToUpdate) => void;
  deleteTask: (taskId: string) => void;
  deleteAllTaskInColumn: (_id: string) => void;
  createColumn: (title: string) => void;
  updateColumn: (_id: string, title: string) => void;
  swapColumn: (_idActive: string, _id: string) => void;
}

export const BoardContext = createContext<BoardContextType>({
  userList: [],
  projectInfo: null,
  updateProject: () => console.log('Error'),
  setSearchInputValue: () => console.log('Error'),
  addUserFilter: () => console.log('Error'),
  deleteUserFilter: () => console.log('Error'),
  getTaskList: () => [],
  columnList: [],
  getFullNameUser: () => ({ firstName: '', lastName: '' }),
  createTask: () => console.log('Error'),
  updateTask: () => console.log('Error'),
  deleteTask: () => console.log('Error'),
  deleteAllTaskInColumn: () => console.log('Error'),
  createColumn: () => console.log('Error'),
  updateColumn: () => console.log('Error'),
  swapColumn: () => console.log('Error')
});

export const BoardProvider = (props: { children: React.ReactNode }) => {
  const [userList, setUserList] = useState<UserType[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectType | null>(null);
  const [columnList, setColumnList] = useState<ColumnProjectType[]>([]);
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const [userListFilter, setUserListFilter] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setUserList(
      userListData.filter(
        (data) => data._id === projectData.author || projectData.team.includes(data._id)
      )
    );
    setColumnList(projectData.columnList);
    setTaskList(taskListData);
    setProjectInfo(projectData);
  }, []);

  const updateProject = useCallback(
    (updateData: ProjectDataToUpdate) => {
      const res = Object.assign(projectInfo ?? {}, updateData) as ProjectType | null;
      setProjectInfo(res);
    },
    [projectInfo]
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
    (columnId: string, taskTitle: string) => {
      const task: TaskType = {
        _id: '6234564adgasdasd4adsg',
        id: 0,
        title: taskTitle,
        description: '',
        author: projectInfo?.author ?? '',
        executor: 'auto',
        projectId: projectInfo?._id ?? '',
        columnId: columnId,
        commentList: [],
        __v: 0
      };

      setTaskList([...taskList, task]);
    },
    [taskList, projectInfo]
  );

  const updateTask = useCallback(
    (_id: string, updateData: TaskDataToUpdate) => {
      const idx = taskList.findIndex((data) => data._id === _id);
      const task = Object.assign({}, taskList[idx]);
      const updatedTask = Object.assign(task, updateData);

      taskList.splice(idx, 1, updatedTask);
      setTaskList([...taskList]);
    },
    [taskList]
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      const idx = taskList.findIndex((data) => data._id === taskId);
      taskList.splice(idx, 1);

      setTaskList([...taskList]);
    },
    [taskList]
  );

  const deleteAllTaskInColumn = useCallback(
    (_id: string) => {
      const res = taskList.filter((data) => data.columnId !== _id);
      setTaskList(res);
    },
    [taskList]
  );

  const createColumn = useCallback(
    (title: string) => {
      const column: ColumnProjectType = {
        _id: '6234564adgasdasd4adsg',
        title: title,
        type: 'common'
      };

      setColumnList([...columnList, column]);
    },
    [columnList]
  );

  const updateColumn = useCallback(
    (_id: string, title: string) => {
      const idx = columnList.findIndex((data) => data._id === _id);
      const column = Object.assign({}, columnList[idx]);
      column.title = title;

      columnList.splice(idx, 1, column);
      setColumnList([...columnList]);
    },
    [columnList]
  );

  const swapColumn = useCallback(
    (_idActive: string, _id: string) => {
      const activeIdx = columnList.findIndex((data) => data._id === _idActive);
      const overIdx = columnList.findIndex((data) => data._id === _id);
      const result = [...columnList];
      const activeColumn = result.splice(activeIdx, 1)[0];
      result.splice(activeIdx > overIdx ? overIdx : overIdx - 1, 0, activeColumn);
      setColumnList(result);
    },
    [columnList]
  );

  const values = useMemo(
    () => ({
      userList,
      projectInfo,
      updateProject,
      setSearchInputValue,
      addUserFilter,
      deleteUserFilter,
      getTaskList,
      columnList,
      getFullNameUser,
      createTask,
      updateTask,
      deleteTask,
      deleteAllTaskInColumn,
      createColumn,
      updateColumn,
      swapColumn
    }),
    [
      userList,
      projectInfo,
      updateProject,
      setSearchInputValue,
      addUserFilter,
      deleteUserFilter,
      getTaskList,
      columnList,
      getFullNameUser,
      createTask,
      updateTask,
      deleteTask,
      deleteAllTaskInColumn,
      createColumn,
      updateColumn,
      swapColumn
    ]
  );

  return <BoardContext.Provider value={values}>{props.children}</BoardContext.Provider>;
};

export const useBoard = () => {
  return useContext(BoardContext);
};
