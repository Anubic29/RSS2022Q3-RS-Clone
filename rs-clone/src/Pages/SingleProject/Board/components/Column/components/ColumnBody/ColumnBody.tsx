import { useState, useEffect } from 'react';
import TaskType from '../../../../../../../types/task/TaskType';
import { MdClose, MdDone } from 'react-icons/md';
import { BtnAction, Task } from '../../../';
import useComponentVisible from '../../../../../../../hooks/useComponentVisible/useComponentVisible';
import {
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight
} from '../../../../../../../theme/variables';
import { useBoard } from '../../../../../../../contexts/Board.context';

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
  const { createTask } = useBoard();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [titleError, setTitleError] = useState(newTaskTitle.length === 0);

  useEffect(() => {
    if (!isComponentVisible) setNewTaskTitle('');
  }, [isComponentVisible]);

  useEffect(() => {
    setTitleError(newTaskTitle.length === 0);
  }, [newTaskTitle]);

  const onSubmitHandler = () => {
    if (!titleError) {
      createTask(props.id, newTaskTitle, props.userId);
      setIsComponentVisible(false);
    }
  };

  return (
    <div
      className={styles['task-list-block']}
      onDragOver={(event) => props.dragHandlersTask.dragOverHandlerTask(event)}
      onDrop={(event) => props.dragHandlersTask.dropHandlerTask(event, props.id)}>
      <div className={styles['task-list']}>
        {props.tasks.map((task, idx) => (
          <div
            className={styles['task-block']}
            key={idx}
            onDragStart={(event) => props.dragHandlersTask.dragStartHandlerTask(event, task._id)}
            onDragEnd={() => props.dragHandlersTask.dragEndHandlerTask()}
            draggable={true}>
            <Task
              _id={task._id}
              title={task.title}
              keyTask={`key-${task.id}`}
              executor={task.executor}
              typeDone={props.type === 'final'}
            />
          </div>
        ))}
      </div>
      <div ref={ref} className={styles['add-task-block']}>
        {!isComponentVisible ? (
          <div className={styles['add-task__field']} onClick={() => setIsComponentVisible(true)}>
            + Create Task
          </div>
        ) : (
          <form className={styles['add-task__form']} action="">
            <div className={styles['add-task__textarea-block']}>
              <textarea
                name="title"
                value={newTaskTitle}
                autoFocus={true}
                className={styles['add-task__textarea']}
                placeholder="Enter task title"
                onChange={(event) => setNewTaskTitle(event.target.value)}></textarea>
            </div>
            {titleError && (
              <span className={styles['error-message']}>Column title can&apos;t be empty</span>
            )}
            <div className={styles['add-task__btns-block']}>
              <div className={styles['btn-block']} onClick={() => onSubmitHandler()}>
                <BtnAction
                  image={MdDone}
                  backgrColorDefault={colorBackgroundColumn}
                  backgrColorHover={colorBackgroundHover}
                  backgrColorActive={colorSecondaryLight}
                />
              </div>
              <div className={styles['btn-block']} onClick={() => setIsComponentVisible(false)}>
                <BtnAction
                  image={MdClose}
                  backgrColorDefault={colorBackgroundColumn}
                  backgrColorHover={colorBackgroundHover}
                  backgrColorActive={colorSecondaryLight}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ColumnBody;
