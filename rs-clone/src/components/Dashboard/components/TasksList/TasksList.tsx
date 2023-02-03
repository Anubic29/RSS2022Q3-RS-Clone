import TasksListItem from '../TasksListItem/TasksListItem';

import styles from './TasksList.module.scss';

function TasksList() {
  return (
    <ul className={styles.tasksList}>
      <TasksListItem />
      <TasksListItem />
      <TasksListItem />
      <TasksListItem />
      <TasksListItem />
    </ul>
  );
}

export default TasksList;
