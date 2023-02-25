import { useState, useRef, useCallback, useMemo } from 'react';
import useComponentVisible from '../../../../../hooks/useComponentVisible/useComponentVisible';
import {
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight
} from '../../../../../theme/variables';
import { Column, ColumnRowUser } from '../';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { useBoard } from '../../../../../contexts';
import { ColumnBody, ColumnHeader } from '../Column/components';
import { usePartOverlay } from '../../../../../contexts';
import { BtnAction, Loader } from '../../../../../components';

import styles from './ColumnList.module.scss';

interface ColumnListProps {
  group: '' | 'Executor';
}

function ColumnList(props: ColumnListProps) {
  const { getUserList, getTaskList, getColumnList, updateTask, swapColumn } = useBoard();
  const { setIsVisibleColumnList, setChildrenColumnList } = usePartOverlay();
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
    async (event: React.DragEvent, column: string) => {
      event.preventDefault();
      if (currentTask !== '') {
        setChildrenColumnList(<Loader />);
        setIsVisibleColumnList(true);
        await updateTask(currentTask, { columnId: column });
        setIsVisibleColumnList(false);
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
    async (event: React.DragEvent, column: string) => {
      event.preventDefault();
      if (currentColumn !== '') {
        setChildrenColumnList(<Loader />);
        setIsVisibleColumnList(true);
        await swapColumn(currentColumn, column);
        setIsVisibleColumnList(false);
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
          {props.group === '' &&
            getColumnList().map((column) => (
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
                    typeDone={column.type === 'final'}
                    dragStartHandlerColumn={dragStartHandlerColumn}
                    dragEndHandlerColumn={dragEndHandlerColumn}
                  />
                  <ColumnBody
                    id={column._id}
                    type={column.type}
                    tasks={getTaskList().filter((task) => task.columnId === column._id)}
                    dragHandlersTask={dragHandlersTask}
                  />
                </Column>
              </div>
            ))}
          {props.group === 'Executor' && (
            <div className={styles['list-content']}>
              <div className={styles['list-content__row']}>
                {getColumnList().map((column) => (
                  <div
                    className={styles['column-block']}
                    key={column._id}
                    onDragOver={(event) => dragOverHandlerColumn(event)}
                    onDrop={(event) => dropHandlerColumn(event, column._id)}>
                    <Column>
                      <ColumnHeader
                        id={column._id}
                        title={column.title}
                        tasksCount={
                          getTaskList().filter((task) => task.columnId === column._id).length
                        }
                        stickyHeader={isScrolledList}
                        typeDone={column.type === 'final'}
                        dragStartHandlerColumn={dragStartHandlerColumn}
                        dragEndHandlerColumn={dragEndHandlerColumn}
                      />
                    </Column>
                  </div>
                ))}
              </div>
              {getUserList().map((user) => {
                const tasks = getTaskList().filter((task) => task.executor === user._id);
                return (
                  tasks.length > 0 && (
                    <div key={user._id}>
                      <ColumnRowUser
                        userId={user._id}
                        columnList={getColumnList()}
                        taskList={tasks}
                        dragHandlersTask={dragHandlersTask}
                      />
                    </div>
                  )
                );
              })}
              <ColumnRowUser
                columnList={getColumnList()}
                taskList={getTaskList().filter((task) => task.executor === 'auto')}
                dragHandlersTask={dragHandlersTask}
              />
            </div>
          )}
          {isComponentVisible && (
            <div className={styles['column-block']}>
              <Column>
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
              </Column>
            </div>
          )}
        </div>
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
        <div className={styles['curtain'] + ' ' + styles['right']}></div>
      </div>
    </div>
  );
}

export default ColumnList;
