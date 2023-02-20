import React from 'react';
import { MdCheckBox } from 'react-icons/md';

import styles from './TasksListItem.module.scss';

function TasksListItem() {
  return (
    <li className={styles.TaskItem}>
      <MdCheckBox className={styles.TaskIcon} />

      <div className={styles.Content}>
        <div className={styles.TitleArea}>
          <div className={styles.TaskTitle}>Checkout popup</div>

          <div className={styles.ProjectInfo}>
            <span>CBC-3</span>
            <span className={styles.Separator}></span>
            <span>Company BD Code</span>
          </div>
        </div>

        <p className={styles.ProjectColumn}>IN DEV</p>
      </div>

      <div className={styles.Empty}></div>
    </li>
  );
}

export default TasksListItem;
