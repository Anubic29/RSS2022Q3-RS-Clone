import { createContext, useMemo } from 'react';
import ColumnProjectType from '../Types/Project/ColumnProjectType';
import TaskType from '../Types/Task/TaskType';

interface IBoardContext {
  taskListCount: number;
  createTask: (columnId: string, taskTitle: string) => void;
  deleteTask: (taskId: string) => void;
  createColumn: (title: string) => void;
  updateColumn: (_id: string, title: string) => void;
}

export const BoardContext = createContext<IBoardContext>({
  taskListCount: 0,
  createTask: () => console.log('Error'),
  deleteTask: () => console.log('Error'),
  createColumn: () => console.log('Error'),
  updateColumn: () => console.log('Error')
});

interface BoardStateProps {
  children: React.ReactNode;
  projectId: string;
  authorId: string;
  taskList: TaskType[];
  columnList: ColumnProjectType[];
  setTaskList: (data: TaskType[]) => void;
  setColumnList: (data: ColumnProjectType[]) => void;
}

export const BoardState = (props: BoardStateProps) => {
  const taskListCount = useMemo(() => {
    return props.taskList.length;
  }, [props.taskList]);

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

    props.setTaskList([...props.taskList, task]);
  };

  const deleteTask = (taskId: string) => {
    const idx = props.taskList.findIndex((data) => data._id === taskId);
    props.taskList.splice(idx, 1);

    props.setTaskList([...props.taskList]);
  };

  const createColumn = (title: string) => {
    const column: ColumnProjectType = {
      _id: '6234564adgasdasd4adsg',
      title: title,
      type: 'common'
    };

    props.setColumnList([...props.columnList, column]);
  };

  const updateColumn = (_id: string, title: string) => {
    const arr = Array.from(props.columnList);
    const idx = arr.findIndex((data) => data._id === _id);
    const column = Object.assign({}, arr[idx]);
    column.title = title;

    arr.splice(idx, 1, column);
    props.setColumnList([...arr]);
  };

  return (
    <BoardContext.Provider
      value={{ taskListCount, createTask, deleteTask, createColumn, updateColumn }}>
      {props.children}
    </BoardContext.Provider>
  );
};
