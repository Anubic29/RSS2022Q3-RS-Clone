import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react';
import { BASE_URL, getCurrentUserId } from '../api/config';
import TaskType from '../types/task/taskType';

interface TasksContextProps {
  tasks: TaskType[];
  getTasks: () => Promise<TaskType[]>;
  getTask: (id: string) => Promise<TaskType>;
  children?: ReactNode;
}

const TasksContext = createContext<TasksContextProps | null>(null);

function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const getTasks = async () => {
    const userId = await getCurrentUserId();
    const ACCESS_TOKEN = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/tasks?author=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    const fetchedTasks: TaskType[] = await res.json();

    setTasks(fetchedTasks);

    return fetchedTasks;
  };

  const getTask = async (id: string) => {
    const ACCESS_TOKEN = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/tasks/${id}/info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    const fetchedTask: TaskType = await res.json();

    return fetchedTask;
  };

  const contextValue = {
    tasks,
    getTasks,
    getTask
  };

  return <TasksContext.Provider value={contextValue}>{children}</TasksContext.Provider>;
}

const useTasks = () => useContext(TasksContext) as TasksContextProps;

export { TasksProvider, useTasks };
