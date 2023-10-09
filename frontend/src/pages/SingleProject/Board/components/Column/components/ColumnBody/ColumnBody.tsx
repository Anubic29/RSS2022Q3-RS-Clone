import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/store';
import { createTask } from '../../../../../../../redux/projectSlice';
import { useComponentVisible } from '../../../../../../../hooks';
import { Preloader, BtnAction } from '../../../../../../../components';
import { Task } from '../../../';
import TaskType from '../../../../../../../types/task/taskType';

import { MdClose, MdDone } from 'react-icons/md';

import styles from './ColumnBody.module.scss';

interface ColumnBodyProps {
  id: string;
  userId?: string;
  tasks: TaskType[];
  type: string;
  dragHandlersTask: {
    dragStartHandlerTask: (event: React.DragEvent, task: string) => void;
    dragEndHandlerTask: () => void;
    dragOverHandlerTask: (event: React.DragEvent) => void;
    dropHandlerTask: (event: React.DragEvent, column: string) => void;
  };
}

function ColumnBody(props: ColumnBodyProps) {
  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const currentProject = useSelector((state: RootState) => state.projectSlice.project);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const titleError = useMemo(() => newTaskTitle.length === 0, [newTaskTitle]);

  const onSubmitHandler = useCallback(() => {
    if (!titleError && currentUser && currentProject) {
      setIsLoadingCreate(true);
      dispatch(
        createTask({
          projectId: currentProject._id,
          columnId: props.id,
          taskTitle: newTaskTitle,
          currUserId: currentUser._id,
          userId: props.userId
        })
      );
      setIsLoadingCreate(false);
      setIsComponentVisible(false);
    }
  }, [props.id, newTaskTitle, titleError, currentUser, currentProject?._id, props.userId]);

  useEffect(() => {
    if (!isComponentVisible) setNewTaskTitle('');
  }, [isComponentVisible]);

  return (
    <div
      className={styles['column-body']}
      onDragOver={(event) => props.dragHandlersTask.dragOverHandlerTask(event)}
      onDrop={(event) => props.dragHandlersTask.dropHandlerTask(event, props.id)}>
      <div className={styles['task-list']}>
        {props.tasks.map((task) => (
          <div
            className={styles['task-block']}
            key={`task-${task._id}`}
            onDragStart={(event) => props.dragHandlersTask.dragStartHandlerTask(event, task._id)}
            onDragEnd={() => props.dragHandlersTask.dragEndHandlerTask()}
            draggable={true}>
            <Task
              _id={task._id}
              title={task.title}
              keyTask={`${currentProject?.key ?? 'key'}-${task.id}`}
              executor={task.executor}
              typeDone={props.type === 'final'}
            />
          </div>
        ))}
      </div>
      <div ref={ref} className={styles['add-task-block']}>
        {!isComponentVisible ? (
          <div className={styles['add-task']} onClick={() => setIsComponentVisible(true)}>
            + Create Task
          </div>
        ) : (
          <div className={styles['new-task']}>
            <textarea
              name="title"
              value={newTaskTitle}
              autoFocus={true}
              className={styles['textarea']}
              placeholder="Enter task title"
              onChange={(event) => setNewTaskTitle(event.target.value)}></textarea>
            {titleError && (
              <span className={styles['error-message']}>Task title can&apos;t be empty</span>
            )}
            <div className={styles['buttons']}>
              <BtnAction image={MdDone} btnClassType="first" onClick={() => onSubmitHandler()} />
              <BtnAction
                image={MdClose}
                btnClassType="first"
                onClick={() => setIsComponentVisible(false)}
              />
            </div>
            {isLoadingCreate && (
              <div className={styles['block-loader']}>
                <Preloader />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnBody;
