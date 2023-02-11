import { useState, useRef, useCallback, useMemo } from 'react';
import useComponentVisible from '../../../../../hooks/useComponentVisible/useComponentVisible';
import {
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight
} from '../../../../../theme/variables';
import { BtnAction, Column } from '../';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { useBoard } from '../../../../../contexts/Board.context';

import styles from './ColumnList.module.scss';
import { ColumnBody, ColumnHeader } from '../Column/components';

function ColumnList() {
  const { getTaskList, columnList, updateTask, swapColumn } = useBoard();
  const [isScrolledList, setIsScrolledList] = useState(false);

  const { isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const [currentTask, setCurrentTask] = useState('');
  const currentTaskElem = useRef<HTMLDivElement | null>(null);

  const dragStartHandlerTask = useCallback((event: React.DragEvent, task: string) => {
    setCurrentTask(task);
    currentTaskElem.current = event.target as HTMLDivElement;
    setTimeout(() => {
      if (currentTaskElem.current) currentTaskElem.current.style.display = 'none';
    }, 0);
  }, []);
  const dragEndHandlerTask = useCallback(() => {
    if (currentTaskElem.current) currentTaskElem.current.style.display = 'block';
  }, []);
  const dragOverHandlerTask = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);
  const dropHandlerTask = useCallback(
    (event: React.DragEvent, column: string) => {
      event.preventDefault();
      if (currentTask !== '') {
        updateTask(currentTask, { columnId: column });
        setCurrentTask('');
      }
    },
    [currentTask, updateTask]
  );
  const dragHandlersTask = useMemo(
    () => ({
      dragStartHandlerTask,
      dragEndHandlerTask,
      dragOverHandlerTask,
      dropHandlerTask
    }),
    [dragStartHandlerTask, dragEndHandlerTask, dragOverHandlerTask, dropHandlerTask]
  );

  const [currentColumn, setCurrentColumn] = useState('');

  const dragStartHandlerColumn = useCallback((event: React.DragEvent, column: string) => {
    let element: HTMLElement | null = event.target as HTMLElement;
    while (element instanceof HTMLElement && !element.classList.contains(styles['column-block']))
      element = element.parentElement;
    if (element instanceof HTMLElement) {
      setCurrentColumn(column);
      setTimeout(() => {
        if (element instanceof HTMLElement) element.style.display = 'none';
      }, 0);
    }
  }, []);
  const dragEndHandlerColumn = useCallback((event: React.DragEvent) => {
    let element: HTMLElement | null = event.target as HTMLElement;
    while (element instanceof HTMLElement && !element.classList.contains(styles['column-block']))
      element = element.parentElement;
    if (element instanceof HTMLElement) {
      element.style.display = 'block';
    }
  }, []);
  const dragOverHandlerColumn = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);
  const dropHandlerColumn = useCallback(
    (event: React.DragEvent, column: string) => {
      event.preventDefault();
      if (currentColumn !== '') {
        swapColumn(currentColumn, column);
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
          {columnList.map((column) => (
            <div
              className={styles['column-block']}
              key={column._id}
              onDragOver={(event) => dragOverHandlerColumn(event)}
              onDrop={(event) => dropHandlerColumn(event, column._id)}>
              <Column>
                <ColumnHeader
                  id={column._id}
                  title={column.title}
                  tasksCount={getTaskList().filter((task) => task.columnId === column._id).length}
                  stickyHeader={isScrolledList}
                  dragStartHandlerColumn={dragStartHandlerColumn}
                  dragEndHandlerColumn={dragEndHandlerColumn}
                />
                <ColumnBody
                  id={column._id}
                  tasks={getTaskList().filter((task) => task.columnId === column._id)}
                  dragHandlersTask={dragHandlersTask}
                />
              </Column>
            </div>
          ))}
          {isComponentVisible && (
            <div className={styles['column-block']}>
              <Column>
                <div>
                  <ColumnHeader
                    id={'new'}
                    title={''}
                    tasksCount={0}
                    stickyHeader={isScrolledList}
                    dragStartHandlerColumn={dragStartHandlerColumn}
                    dragEndHandlerColumn={dragEndHandlerColumn}
                    typeCreate={true}
                    setIsComponentVisibleCreate={setIsComponentVisible}
                  />
                </div>
              </Column>
            </div>
          )}
        </div>
        {columnList.length < 5 && (
          <div className={styles['btn-add-container']}>
            <div className={styles['btn-add']} onClick={() => setIsComponentVisible(true)}>
              <BtnAction
                image={MdOutlineAddCircleOutline}
                title="Create column"
                backgrColorDefault={colorBackgroundColumn}
                backgrColorHover={colorBackgroundHover}
                backgrColorActive={colorSecondaryLight}
              />
            </div>
          </div>
        )}
        <div className={styles['curtain'] + ' ' + styles['right']}></div>
      </div>
    </div>
  );
}

export default ColumnList;
