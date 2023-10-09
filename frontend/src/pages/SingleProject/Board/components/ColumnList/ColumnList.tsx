import { useState, useRef, useCallback, useMemo } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { swapColumn, updateTask } from '../../../../../redux/projectSlice';
import { BtnAction } from '../../../../../components';
import { ColumnBody, ColumnHeader } from '../Column/components';
import { Column, ColumnRowUser } from '../';

import { MdOutlineAdd } from 'react-icons/md';

import styles from './ColumnList.module.scss';

interface ColumnListProps {
  group: '' | 'Executor';
}

function ColumnList(props: ColumnListProps) {
  const currentProject = useSelector((state: RootState) => state.projectSlice.project);
  const columnList = useSelector((state: RootState) => state.projectSlice.columns);
  const taskList = useSelector((state: RootState) => state.projectSlice.tasks);
  const filterUser = useSelector((state: RootState) => state.projectSlice.filterUser);
  const searchValue = useSelector((state: RootState) => state.projectSlice.searchValue);
  const userList = useSelector((state: RootState) => state.projectSlice.users);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const [isScrolledList, setIsScrolledList] = useState(false);
  const [isNewColumnVisible, setIsNewColumnVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [currentColumn, setCurrentColumn] = useState('');

  const currentTaskElem = useRef<HTMLDivElement | null>(null);

  const taskDisplayList = useMemo(() => {
    let res = taskList;
    if (filterUser.length > 0) res = res.filter((task) => filterUser.includes(task.executor));
    if (searchValue.length > 0) res = res.filter((task) => task.title.includes(searchValue));
    return res;
  }, [taskList, filterUser, searchValue]);

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
        dispatch(updateTask(currentTask, { columnId: column }));
        setCurrentTask('');
      }
    },
    [currentTask]
  );

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
        dispatch(swapColumn(`${currentProject?._id}`, currentColumn, column));
        setCurrentColumn('');
      }
    },
    [currentColumn]
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

  return (
    <div
      className={styles['column-list-container']}
      onScroll={(event) => setIsScrolledList((event.target as HTMLDivElement).scrollTop > 0)}>
      <div className={styles['column-list']}>
        {props.group === '' && (
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
                    tasksCount={
                      taskDisplayList.filter((task) => task.columnId === column._id).length
                    }
                    stickyHeader={isScrolledList}
                    typeDone={column.type === 'final'}
                    dragStartHandlerColumn={dragStartHandlerColumn}
                    dragEndHandlerColumn={dragEndHandlerColumn}
                  />
                  <ColumnBody
                    id={column._id}
                    type={column.type}
                    tasks={taskDisplayList.filter((task) => task.columnId === column._id)}
                    dragHandlersTask={dragHandlersTask}
                  />
                </Column>
              </div>
            ))}
          </div>
        )}
        {props.group === 'Executor' && (
          <div className={styles['multi-list-block']}>
            <div className={`${styles['list']} ${isScrolledList ? styles['sticky'] : ''}`}>
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
                      tasksCount={
                        taskDisplayList.filter((task) => task.columnId === column._id).length
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
            {userList.map((user) => {
              const tasks = taskDisplayList.filter((task) => task.executor === user._id);
              return (
                tasks.length > 0 && (
                  <div key={user._id}>
                    <ColumnRowUser
                      userId={user._id}
                      columnList={columnList}
                      taskList={tasks}
                      dragHandlersTask={dragHandlersTask}
                    />
                  </div>
                )
              );
            })}
            <ColumnRowUser
              columnList={columnList}
              taskList={taskDisplayList.filter((task) => task.executor === 'auto')}
              dragHandlersTask={dragHandlersTask}
              classNameObj={{ 'user-row': styles['last-list'], list: styles['last-list'] }}
            />
          </div>
        )}
        {isNewColumnVisible && (
          <div className={`${styles['column-block']} ${styles['last-column']}`}>
            <Column>
              <ColumnHeader
                id={'new'}
                title={''}
                tasksCount={0}
                stickyHeader={isScrolledList}
                dragStartHandlerColumn={dragStartHandlerColumn}
                dragEndHandlerColumn={dragEndHandlerColumn}
                setIsNewColumnVisible={setIsNewColumnVisible}
              />
            </Column>
          </div>
        )}
        <div className={styles['btn-add-container']}>
          <BtnAction
            image={MdOutlineAdd}
            title="Create column"
            btnClassType="first"
            className={styles['btn-add']}
            onClick={() => setIsNewColumnVisible(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default ColumnList;
