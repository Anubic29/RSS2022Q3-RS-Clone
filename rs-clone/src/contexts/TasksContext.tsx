import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react';
import { ACCESS_TOKEN, BASE_URL, getCurrentUserId } from '../api/config';
import TaskType from '../types/task/taskType';
import NotedItemUserType from '../types/user/notedItemUserType';

interface TasksContextProps {
  tasks: TaskType[];
  notedItems: NotedItemUserType[];
  getTasks: () => Promise<TaskType[]>;
  getTask: (id: string) => Promise<TaskType>;
  getNotedItems: () => Promise<NotedItemUserType[]>;
  removeNotedItem: (id: string) => Promise<void>;
  children?: ReactNode;
}

const TasksContext = createContext<TasksContextProps | null>(null);

function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [notedItems, setNotedItems] = useState<NotedItemUserType[]>([]);

  const getTasks = async () => {
    const userId = await getCurrentUserId();
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
    const res = await fetch(`${BASE_URL}/tasks/${id}/info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    const fetchedTask: TaskType = await res.json();

    return fetchedTask;
  };

  const getNotedItems = async () => {
    const userId = await getCurrentUserId();
    const res = await fetch(`${BASE_URL}/users/${userId}/noted`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    const items: NotedItemUserType[] = await res.json();

    setNotedItems(items);

    return items;
  };

  const removeNotedItem = async (id: string) => {
    const userId = await getCurrentUserId();

    await fetch(`${BASE_URL}/users/${userId}/noted/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    setNotedItems(notedItems.filter((item) => item.id !== id));
  };

  const contextValue = {
    tasks,
    getTasks,
    getTask,
    notedItems,
    getNotedItems,
    removeNotedItem
  };

  return <TasksContext.Provider value={contextValue}>{children}</TasksContext.Provider>;
}

const useTasks = () => useContext(TasksContext) as TasksContextProps;

export { TasksProvider, useTasks };
