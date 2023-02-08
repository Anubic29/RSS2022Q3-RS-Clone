import { useState, useRef, useCallback, useMemo } from 'react';
import {
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight
} from '../../../../theme/variables';
import { BtnAction, Column } from '../';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

import styles from './ColumnList.module.scss';

type ColumnType = {
  _id: string;
  title: string;
  type: string;
};

type TaskType = {
  _id: string;
  id: number;
  title: string;
  columnId: string;
};

interface ColumnListProps {
  columnList: ColumnType[];
  taskList: TaskType[];
  setColumnList: (data: ColumnType[]) => void;
  setTaskList: (data: TaskType[]) => void;
}

function ColumnList(props: ColumnListProps) {
  const [isScrolledList, setIsScrolledList] = useState(false);

  const [currentTask, setCurrentTask] = useState('');
  const currentTaskElem = useRef<HTMLDivElement | null>(null);

  const dragStartHandlerTask = useCallback(
    (event: React.DragEvent<HTMLDivElement>, task: string) => {
      setCurrentTask(task);
      currentTaskElem.current = event.target as HTMLDivElement;
      setTimeout(() => {
        if (currentTaskElem.current) currentTaskElem.current.style.display = 'none';
      }, 0);
    },
    []
  );
  const dragEndHandlerTask = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    if (currentTaskElem.current) currentTaskElem.current.style.display = 'block';
  }, []);
  const dragLeaveHandlerTask = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    // if (currentTaskElem.current) currentTaskElem.current.style.display = 'block';
  }, []);
  const dragOverHandlerTask = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);
  const dropHandlerTask = useCallback(
    (event: React.DragEvent<HTMLDivElement>, column: string) => {
      event.preventDefault();
      if (currentTaskElem.current) currentTaskElem.current.style.display = 'block';
      props.setTaskList(
        props.taskList.map((task) => {
          if (task._id === currentTask) task.columnId = column;
          return task;
        })
      );
      setCurrentTask('');
    },
    [currentTask]
  );
  const dragHandlersTask = useMemo(
    () => ({
      dragStartHandlerTask,
      dragEndHandlerTask,
      dragLeaveHandlerTask,
      dragOverHandlerTask,
      dropHandlerTask
    }),
    [
      dragStartHandlerTask,
      dragOverHandlerTask,
      dropHandlerTask,
      dragEndHandlerTask,
      dragLeaveHandlerTask
    ]
  );

  const [currentColumn, setCurrentColumn] = useState('');

  const dragStartHandlerColumn = useCallback(
    (event: React.DragEvent<HTMLDivElement>, column: string) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.classList.contains(styles['column-block'])
      ) {
        setCurrentColumn(column);
        setTimeout(() => {
          if (event.target instanceof HTMLElement) event.target.style.display = 'none';
        }, 0);
      }
    },
    []
  );
  const dragEndHandlerColumn = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.classList.contains(styles['column-block'])
    ) {
      event.target.style.display = 'block';
    }
  }, []);
  const dragLeaveHandlerColumn = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    // if (currentTaskElem.current) currentTaskElem.current.style.display = 'block';
  }, []);
  const dragOverHandlerColumn = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);
  const dropHandlerColumn = useCallback(
    (event: React.DragEvent<HTMLDivElement>, column: string) => {
      if (currentColumn !== '') {
        event.preventDefault();
        const activeIdx = props.columnList.findIndex((data) => data._id === currentColumn);
        const overIdx = props.columnList.findIndex((data) => data._id === column);
        const result = [...props.columnList];
        const activeColumn = result.splice(activeIdx, 1)[0];
        result.splice(overIdx - 1 >= 0 ? overIdx - 1 : overIdx, 0, activeColumn);
        props.setColumnList(result);
        setCurrentColumn('');
      }
    },
    [currentColumn]
  );

  return (
    <div
      className={styles['column-list-container']}
      onScroll={(event) => setIsScrolledList((event.target as HTMLDivElement).scrollTop > 0)}>
      <div className={styles['column-list']}>
        <div className={styles['curtain'] + ' ' + styles['left']}></div>
        <div className={styles['list']}>
          {props.columnList.map((column) => (
            <div
              className={styles['column-block']}
              key={column._id}
              onDragStart={(event) => dragStartHandlerColumn(event, column._id)}
              onDragLeave={(event) => dragLeaveHandlerColumn(event)}
              onDragEnd={(event) => dragEndHandlerColumn(event)}
              onDragOver={(event) => dragOverHandlerColumn(event)}
              onDrop={(event) => dropHandlerColumn(event, column._id)}
              draggable={true}>
              <Column
                id={column._id}
                title={column.title}
                stickyHeader={isScrolledList}
                tasks={props.taskList.filter((task) => task.columnId === column._id)}
                dragHandlersTask={dragHandlersTask}
              />
            </div>
          ))}
        </div>
        <div className={styles['btn-add-container']}>
          <div className={styles['btn-add']}>
            <BtnAction
              image={MdOutlineAddCircleOutline}
              title="Create column"
              backgrColorDefault={colorBackgroundColumn}
              backgrColorHover={colorBackgroundHover}
              backgrColorActive={colorSecondaryLight}
            />
          </div>
        </div>
        <div className={styles['curtain'] + ' ' + styles['right']}></div>
      </div>
    </div>
  );
}

export default ColumnList;
