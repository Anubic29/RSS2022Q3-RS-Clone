import { useState } from 'react';
import { colorBackgroundHover, colorSecondaryLight } from '../../../../theme/variables';
import Task from '../Task/Task';
import BtnMenuAction from '../BtnMenuAction/BtnMenuAction';

import styles from './Column.module.scss';

interface ColumnProps {
  title: string;
  tasks: number[];
}

function Column(props: ColumnProps) {
  const [title, setTitle] = useState(props.title);
  const [canEditTitle, setCanEditTitle] = useState(false);
  const [hoverColumn, setHoverColumn] = useState(false);

  return (
    <div className={styles['column-container']}>
      <div
        className={styles.column}
        onMouseOver={() => setHoverColumn(true)}
        onMouseOut={() => setHoverColumn(false)}>
        {!canEditTitle && hoverColumn && (
          <div className={styles['btn-more']}>
            <BtnMenuAction
              options={['Change', 'Remove']}
              btnBackgrColorHover={colorBackgroundHover}
              btnBackgrColorActive={colorSecondaryLight}
            />
          </div>
        )}
        <div className={styles['info-block']}>
          <form className={styles['title__form']} action="">
            {!canEditTitle ? (
              <span className={styles['title__form__text-backgr']}>
                <span className={styles['title__form__container']}>
                  <span
                    className={styles['title__form__text']}
                    onClick={() => setCanEditTitle(true)}>
                    <span>{title.length >= 10 ? title.substring(0, 9) + '...' : title}</span>
                    <span className={styles.tasks}>{props.tasks.length} tasks</span>
                  </span>
                </span>
              </span>
            ) : (
              <input
                className={styles['title__form__input']}
                type="text"
                autoFocus
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                onBlur={() => setCanEditTitle(false)}
              />
            )}
          </form>
        </div>
        <div className={styles['task-list']}>
          {props.tasks.map((task, idx) => (
            <Task title="Title" keyTask={`key-${task}`} key={idx} />
          ))}
        </div>
        <div className={styles['add-field']}>+ Create Task</div>
      </div>
    </div>
  );
}

export default Column;
