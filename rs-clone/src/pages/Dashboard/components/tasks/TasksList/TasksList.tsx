import { TasksListItem } from '../..';
import { EmptyData } from '../../../../../components';

import styles from './TasksList.module.scss';

function TasksList() {
  const testCondition = true;

  return (
    <>
      {testCondition ? (
        <ul className={styles.TasksList}>
          <TasksListItem />
        </ul>
      ) : (
        <div className={styles.Empty}>
          <EmptyData text="There are no tasks assigned to you" />
        </div>
      )}
    </>
  );
}

export default TasksList;
