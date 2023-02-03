import TasksList from '../TasksList/TasksList';

import styles from './TasksSection.module.scss';

function TasksSection() {
  return (
    <div className={styles.tasksSection}>
      <ul className={styles.tabs}>
        <li className={styles.tabsItem}>Your tasks</li>
        <li className={styles.tabsItem}>Marked</li>
      </ul>
      <div className={styles.content}>
        <TasksList />
      </div>
    </div>
  );
}

export default TasksSection;
