import ProjectType from '../types/project/projectType';
import ColumnProjectType from '../types/project/columnProjectType';
import TaskType from '../types/task/taskType';
import UserType from '../types/user/userType';

export type TaskDataToUpdate = {
  title?: string;
  description?: string;
  author?: string;
  executor?: string;
  projectId?: string;
  columnId?: string;
};

export type ColumnDataToUpdate = {
  title?: string;
  type?: string;
};

export type ProjectDataToUpdate = {
  title?: string;
  description?: string;
  key?: string;
  boardTitle?: string;
  color?: string;
  author?: string;
  pathImage?: string;
};

export type UserDataForAvatar = {
  firstName: string;
  lastName: string;
};

export interface BoardContextType {
  setProjectDataBack: (ProjectId: string) => Promise<ProjectType | null>;
  setTasksDataBack: (ProjectId: string) => Promise<boolean>;
  setUsersDataBack: (usersId: string[]) => Promise<boolean>;
  getUserList: () => UserType[];
  projectInfo: ProjectType | null;
  updateProject: (updateData: ProjectDataToUpdate) => Promise<boolean>;
  deleteProject: () => Promise<boolean>;
  addUserToTeam: (_id: string) => void;
  setSearchInputValue: (value: string) => void;
  addUserFilter: (_id: string) => void;
  deleteUserFilter: (_id: string) => void;
  getTaskList: () => TaskType[];
  getColumnList: () => ColumnProjectType[];
  getColumnCount: () => number;
  getFullNameUser: (_id: string) => UserDataForAvatar | undefined;
  createTask: (columnId: string, taskTitle: string, userId?: string) => void;
  updateTask: (_id: string, updateData: TaskDataToUpdate) => void;
  deleteTask: (taskId: string) => void;
  deleteAllTaskInColumn: (_id: string) => void;
  moveTasksToColumn: (_cuurId: string, _newId: string) => void;
  createColumn: (columnTitle: string) => void;
  updateColumn: (_id: string, updateData: ColumnDataToUpdate) => Promise<boolean>;
  deleteColumn: (_id: string) => void;
  swapColumn: (_idActive: string, _id: string) => void;
}
