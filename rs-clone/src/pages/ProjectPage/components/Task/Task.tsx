import { useState } from 'react';
import { MdDone, MdAccountCircle } from 'react-icons/md';
import { colorBackgroundHover, colorSecondaryLight } from '../../../../theme/variables';
import { BtnMenuAction } from '../';

import styles from './Task.module.scss';

interface TaskProps {
  title: string;
  keyTask: string;
}

function Task(props: TaskProps) {
  const [hoverTask, setHoverTask] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  return (
    <div
      className={styles.task}
      onMouseOver={() => setHoverTask(true)}
      onMouseOut={() => setHoverTask(false)}>
      {(hoverTask || isActiveMenu) && (
        <div className={styles['btn-more']}>
          <BtnMenuAction
            options={['Change', 'Remove']}
            btnBackgrColorHover={colorBackgroundHover}
            btnBackgrColorActive={colorSecondaryLight}
            onActiveMenu={(value) => setIsActiveMenu(value)}
          />
        </div>
      )}
      <div className={styles['task__title-block']}>
        <span className={styles.title}>
          {props.title.length >= 24 ? props.title.substring(0, 24) + '...' : props.title}
        </span>
      </div>
      <div className={styles['task__info-block']}>
        <div className={styles.info}>
          <div className={styles['info__type']}>
            <MdDone color="white" />
          </div>
          <div className={styles['info__key']}>{props.keyTask}</div>
        </div>
        <div className={styles['user-block']}>
          <MdAccountCircle size={24} />
        </div>
      </div>
    </div>
  );
}

export default Task;
