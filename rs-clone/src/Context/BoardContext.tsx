import { createContext } from 'react';
import ColumnProjectType from '../Types/Project/ColumnProjectType';
import TaskType from '../Types/Task/TaskType';

interface IBoardContext {
  createTask: (columnId: string, taskTitle: string) => void;
  createColumn: (title: string) => void;
}

export const BoardContext = createContext<IBoardContext>({
  createTask: () => console.log('Error'),
  createColumn: () => console.log('Error')
});

interface BoardStateProps {
  children: React.ReactNode;
  projectId: string;
  authorId: string;
  addTaskToList: (data: TaskType) => void;
  addColumnToList: (data: ColumnProjectType) => void;
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

  const createColumn = (title: string) => {
    const column: ColumnProjectType = {
      _id: '6234564adgasdasd4adsg',
      title: title,
      type: 'common'
    };

    props.addColumnToList(column);
  };

  return (
    <BoardContext.Provider value={{ createTask, createColumn }}>
      {props.children}
    </BoardContext.Provider>
  );
};
