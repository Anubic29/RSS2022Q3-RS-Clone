import { MdCheckBox } from 'react-icons/md';

import styles from './TasksListItem.module.scss';

function TasksListItem() {
  return (
    <li className={styles.taskItem}>
      <MdCheckBox className={styles.taskIcon} />
      <div className={styles.content}>
        <div className={styles.titleArea}>
          <div className={styles.taskTitle}>Checkout popup</div>
          <div className={styles.taskAdditional}>
            <span>CBC-3</span>
            <span className={styles.separator}></span>
            <span>Company BD Code</span>
          </div>
        </div>
        <p className={styles.taskColumnTitle}>IN DEV</p>
      </div>
      <div className={styles.empty}></div>
    </li>
  );
}

export default TasksListItem;
