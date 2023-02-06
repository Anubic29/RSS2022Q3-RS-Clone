import { TasksListItem } from '../..';

import Styles from './TasksList.module.scss';

function TasksList() {
  return (
    <ul className={Styles.TasksList}>
      <TasksListItem />
      <TasksListItem />
      <TasksListItem />
      <TasksListItem />
      <TasksListItem />
    </ul>
  );
}

export default TasksList;
