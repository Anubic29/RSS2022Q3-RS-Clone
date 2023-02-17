import { TasksListItem } from '../..';
import { EmptyData } from '../../../../../components';

import Styles from './TasksList.module.scss';

function TasksList() {
  const testCondition = true;

  return (
    <>
      {testCondition ? (
        <ul className={Styles.TasksList}>
          <TasksListItem />
        </ul>
      ) : (
        <div className={Styles.Empty}>
          <EmptyData text="There are no tasks assigned to you" />
        </div>
      )}
    </>
  );
}

export default TasksList;
