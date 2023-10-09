/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProjectType, SingleProjectType } from '../types/project/projectType';
import TaskType from '../types/task/taskType';
import UserType from '../types/user/userType';
import websocketAPI, {
  SubscribeColumnType,
  SubscribeProjectType,
  SubscribeSingleProjectType,
  SubscribeTaskType,
  SubscribeTeamType
} from '../api/websocket-api';
import ColumnProjectType from '../types/project/columnProjectType';

type CreateTaskArgs = {
  taskTitle: string;
  projectId: string;
  currUserId: string;
  userId?: string;
  columnId: string;
};

export interface IProjectState {
  project?: SingleProjectType;
  columns: ColumnProjectType[];
  tasks: TaskType[];
  users: UserType[];
  filterUser: string[];
  searchValue: string;
  isLoadingColumns: boolean;
  isLoadingTasks: boolean;
  isLoadingTeam: boolean;
  needLeaveProject: boolean;
}

const initialState: IProjectState = {
  columns: [],
  tasks: [],
  users: [],
  filterUser: [],
  searchValue: '',
  isLoadingColumns: true,
  isLoadingTasks: true,
  isLoadingTeam: true,
  needLeaveProject: false
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<SingleProjectType>) => {
      state.project = action.payload;
      state.needLeaveProject = false;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    addUserToFilter: (state, action: PayloadAction<string>) => {
      state.filterUser.push(action.payload);
    },
    removeUserFromFilter: (state, action: PayloadAction<string>) => {
      state.filterUser.splice(state.filterUser.indexOf(action.payload), 1);
    },
    resetFilterData: (state) => {
      state.searchValue = '';
      state.filterUser = [];
    },
    resetData: (state) => {
      state.project = undefined;
      state.columns = [];
      state.tasks = [];
      state.users = [];
      state.isLoadingColumns = true;
      state.isLoadingTasks = true;
      state.isLoadingTeam = true;
      state.needLeaveProject = false;
    },
    setColumns: (state, action: PayloadAction<ColumnProjectType[]>) => {
      state.columns = action.payload;
      if (state.isLoadingColumns) state.isLoadingColumns = false;
    },
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = state.tasks.concat(action.payload);
      if (state.isLoadingTasks) state.isLoadingTasks = false;
    },
    updateTasks: (state, action: PayloadAction<TaskType[]>) => {
      action.payload.forEach((task) => {
        const idx = state.tasks.findIndex((item) => item._id === task._id);
        if (idx >= 0) state.tasks.splice(idx, 1, task);
      });
    },
    removeTasks: (state, action: PayloadAction<string[]>) => {
      state.tasks = state.tasks.filter((task) => !action.payload.includes(task._id));
    },
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = state.users.concat(action.payload);
      if (state.isLoadingTeam) state.isLoadingTeam = false;
    },
    removeUsers: (state, action) => {
      state.users = state.users.filter((user) => !action.payload.includes(user._id));
    },
    checkRemovedProject: (state, action: PayloadAction<string>) => {
      if (state.project) {
        state.needLeaveProject = state.project._id === action.payload;
      }
    },
    setNotFound: (state) => {
      state.project = undefined;
      state.isLoadingColumns = false;
      state.isLoadingTasks = false;
      state.isLoadingTeam = false;
    }
  }
});

export const { setSearchValue, addUserToFilter, removeUserFromFilter, resetFilterData } =
  projectSlice.actions;
export default projectSlice.reducer;

let _singleProjectHandler: SubscribeSingleProjectType | null = null;
const singleProjectHandler = (dispatch: Dispatch) => {
  if (_singleProjectHandler === null) {
    _singleProjectHandler = (method, singleProject) => {
      switch (method) {
        case 'set':
          dispatch(projectSlice.actions.setProject(singleProject as SingleProjectType));
          break;
        case 'delete':
          dispatch(projectSlice.actions.checkRemovedProject(singleProject as string));
          break;
        case 'disable':
          dispatch(projectSlice.actions.setNotFound());
          break;
      }
    };
  }

  return _singleProjectHandler;
};

let _columnHandler: SubscribeColumnType | null = null;
const columnHandler = (dispatch: Dispatch) => {
  if (_columnHandler === null) {
    _columnHandler = (method, columns) => {
      switch (method) {
        case 'set':
          dispatch(projectSlice.actions.setColumns(columns));
          break;
      }
    };
  }

  return _columnHandler;
};

let _taskHandler: SubscribeTaskType | null = null;
const taskHandler = (dispatch: Dispatch) => {
  if (_taskHandler === null) {
    _taskHandler = (method, tasks) => {
      switch (method) {
        case 'get':
          dispatch(projectSlice.actions.setTasks(tasks as TaskType[]));
          break;
        case 'put':
          dispatch(projectSlice.actions.updateTasks(tasks as TaskType[]));
          break;
        case 'delete':
          dispatch(projectSlice.actions.removeTasks(tasks as string[]));
          break;
      }
    };
  }

  return _taskHandler;
};

let _teamHandler: SubscribeTeamType | null = null;
const teamHandler = (dispatch: Dispatch) => {
  if (_teamHandler === null) {
    _teamHandler = (method, team) => {
      switch (method) {
        case 'get':
          dispatch(projectSlice.actions.setUsers(team as UserType[]));
          break;
        case 'delete':
          dispatch(projectSlice.actions.removeUsers(team as string[]));
          break;
      }
    };
  }

  return _teamHandler;
};

export const joinProject = (projectId: string) => (dispatch: Dispatch) => {
  websocketAPI.subscribeSingleProject(singleProjectHandler(dispatch));
  websocketAPI.subscribeColumn(columnHandler(dispatch));
  websocketAPI.subscribeTask(taskHandler(dispatch));
  websocketAPI.subscribeTeam(teamHandler(dispatch));
  const request = {
    type: 'join',
    projectId
  };
  websocketAPI.sendMessage(JSON.stringify(request));
};

export const leaveProject = () => (dispatch: Dispatch) => {
  dispatch(projectSlice.actions.resetFilterData());
  dispatch(projectSlice.actions.resetData());
  websocketAPI.unsubscribeSingleProject(singleProjectHandler(dispatch));
  websocketAPI.unsubscribeColumn(columnHandler(dispatch));
  websocketAPI.unsubscribeTask(taskHandler(dispatch));
  websocketAPI.unsubscribeTeam(teamHandler(dispatch));
  const request = {
    type: 'leave'
  };
  websocketAPI.sendMessage(JSON.stringify(request));
};

export const createTask =
  ({ taskTitle, projectId, currUserId, userId, columnId }: CreateTaskArgs) =>
  (dispatch: Dispatch) => {
    const message = {
      type: 'task',
      method: 'create',
      data: {
        title: taskTitle,
        description: '',
        author: currUserId,
        executor: userId ?? 'auto',
        projectId,
        columnId
      }
    };
    websocketAPI.sendMessage(JSON.stringify(message));
  };

export const updateTask =
  (_id: string, updatedTask: { [key: string]: string }) => (dispatch: Dispatch) => {
    const message = { type: 'task', method: 'update', data: { ...updatedTask, _id } };
    websocketAPI.sendMessage(JSON.stringify(message));
  };

export const removeTask =
  ({ taskId, columnId, projectId }: { [key: string]: string }) =>
  (dispatch: Dispatch) => {
    const message = {
      type: 'task',
      method: 'remove',
      data: { _id: taskId, columnId, projectId }
    };
    websocketAPI.sendMessage(JSON.stringify(message));
  };

export const createColumn = (projectId: string, title: string) => (dispatch: Dispatch) => {
  const message = { type: 'column', method: 'create', data: { title, type: 'common', projectId } };
  websocketAPI.sendMessage(JSON.stringify(message));
};

export const updateColumn =
  (projectId: string, _id: string, updatedColumn: { [key: string]: string }) =>
  (dispatch: Dispatch) => {
    const message = {
      type: 'column',
      method: 'update',
      data: { ...updatedColumn, _id, projectId }
    };
    websocketAPI.sendMessage(JSON.stringify(message));
  };

export const removeColumn =
  (projectId: string, _id: string, newColumnId?: string) => (dispatch: Dispatch) => {
    const message = { type: 'column', method: 'remove', data: { _id, projectId, newColumnId } };
    websocketAPI.sendMessage(JSON.stringify(message));
  };

export const swapColumn =
  (projectId: string, activeId: string, overId: string) => (dispatch: Dispatch) => {
    const message = { type: 'column', method: 'swap', data: { projectId, activeId, overId } };
    websocketAPI.sendMessage(JSON.stringify(message));
  };

export const addUserToProject = (projectId: string, _id: string) => (dispatch: Dispatch) => {
  const message = { type: 'team', method: 'add', data: { projectId, _id } };
  websocketAPI.sendMessage(JSON.stringify(message));
};

export const removeUserFromProject = (projectId: string, _id: string) => (dispatch: Dispatch) => {
  const message = { type: 'team', method: 'remove', data: { projectId, _id } };
  websocketAPI.sendMessage(JSON.stringify(message));
};
