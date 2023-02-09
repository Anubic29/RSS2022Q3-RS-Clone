import { createContext } from 'react';
import TaskType from '../Types/Task/TaskType';

interface IBoardContext {
  createTask: (columnId: string, taskTitle: string) => void;
}

export const BoardContext = createContext<IBoardContext>({
  createTask: () => console.log('Error')
});

interface BoardStateProps {
  children: React.ReactNode;
  projectId: string;
  authorId: string;
  addTaskToList: (data: TaskType) => void;
}

export const BoardState = (props: BoardStateProps) => {
  const createTask = (columnId: string, taskTitle: string) => {
    const task: TaskType = {
      _id: '6234564adgasdasd4adsg',
      id: 0,
      title: taskTitle,
      description: '',
      author: props.authorId,
      executor: 'auto',
      projectId: props.projectId,
      columnId: columnId,
      commentList: [],
      __v: 0
    };

    props.addTaskToList(task);
  };

  return <BoardContext.Provider value={{ createTask }}>{props.children}</BoardContext.Provider>;
};
