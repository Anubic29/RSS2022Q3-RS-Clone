import { useState } from 'react';
import {
  colorBackground,
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight
} from '../../../../theme/variables';
import { Task, BtnMenuAction, BtnAction } from '../';
import { MdDone, MdClose } from 'react-icons/md';
import useComponentVisible from '../../../../hooks/useComponentVisible/useComponentVisible';

import styles from './Column.module.scss';

interface ColumnProps {
  id: string;
  title: string;
  tasks: {
    _id: string;
    id: number;
    title: string;
    columnId: string;
  }[];
  stickyHeader?: boolean;
  dragHandlersTask: {
    dragStartHandlerTask: (event: React.DragEvent<HTMLDivElement>, task: string) => void;
    dragEndHandlerTask: (event: React.DragEvent<HTMLDivElement>) => void;
    dragLeaveHandlerTask: (event: React.DragEvent<HTMLDivElement>) => void;
    dragOverHandlerTask: (event: React.DragEvent<HTMLDivElement>) => void;
    dropHandlerTask: (event: React.DragEvent<HTMLDivElement>, column: string) => void;
  };
}

function Column(props: ColumnProps) {
  const [title, setTitle] = useState(props.title);
  const [hoverColumnHeader, setHoverColumnHeader] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const {
    ref,
    isComponentVisible: isInputHeaderVisible,
    setIsComponentVisible: setIsInputHeaderVisible
  } = useComponentVisible(false);

  const HeaderBlockStyles = props.stickyHeader
    ? styles['header-block'] + ' ' + styles['sticky']
    : styles['header-block'];

  return (
    <div className={styles['column-container']}>
      <div
        className={styles.column}
        onDragOver={(event) => props.dragHandlersTask.dragOverHandlerTask(event)}
        onDrop={(event) => props.dragHandlersTask.dropHandlerTask(event, props.id)}>
        <div
          className={HeaderBlockStyles}
          onMouseOver={() => setHoverColumnHeader(true)}
          onMouseOut={() => setHoverColumnHeader(false)}>
          <form className={styles['title__form']} action="">
            {!isInputHeaderVisible ? (
              <span className={styles['title__form__text-backgr']}>
                <span className={styles['title__form__container']}>
                  <span
                    className={styles['title__form__text']}
                    onClick={() => setIsInputHeaderVisible(true)}>
                    <span>{title.length >= 10 ? title.substring(0, 9) + '...' : title}</span>
                    <span className={styles.tasks}>{props.tasks.length} tasks</span>
                  </span>
                </span>
              </span>
            ) : (
              <div className={styles['content']} ref={ref}>
                <input
                  className={styles['title__form__input']}
                  type="text"
                  autoFocus
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <div className={styles['btns-block']}>
                  <div className={styles['btn-block']}>
                    <BtnAction
                      image={MdDone}
                      backgrColorDefault={colorBackground}
                      backgrColorHover={colorBackgroundColumn}
                      backgrColorActive={colorSecondaryLight}
                    />
                  </div>
                  <div className={styles['btn-block']}>
                    <BtnAction
                      image={MdClose}
                      backgrColorDefault={colorBackground}
                      backgrColorHover={colorBackgroundColumn}
                      backgrColorActive={colorSecondaryLight}
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
          {!isInputHeaderVisible && (isActiveMenu || hoverColumnHeader) && (
            <div className={styles['btn-more']}>
              <BtnMenuAction
                options={['Change', 'Remove']}
                btnBackgrColorHover={colorBackgroundHover}
                btnBackgrColorActive={colorSecondaryLight}
                onActiveMenu={(value) => setIsActiveMenu(value)}
              />
            </div>
          )}
        </div>
        <div className={styles['task-list']}>
          {props.tasks.map((task, idx) => (
            <div
              className={styles['task-block']}
              key={idx}
              onDragStart={(event) => props.dragHandlersTask.dragStartHandlerTask(event, task._id)}
              onDragLeave={(event) => props.dragHandlersTask.dragLeaveHandlerTask(event)}
              onDragEnd={(event) => props.dragHandlersTask.dragEndHandlerTask(event)}
              draggable={true}>
              <Task title={task.title} keyTask={`key-${task.id}`} />
            </div>
          ))}
        </div>
        <div className={styles['add-field']}>+ Create Task</div>
      </div>
    </div>
  );
}

export default Column;
