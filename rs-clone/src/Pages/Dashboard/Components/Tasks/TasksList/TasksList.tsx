// import { TasksListItem } from '../..';
import { EmptyData } from '../../../../../Components';

import Styles from './TasksList.module.scss';

function TasksList() {
  return (
    <ul className={Styles.TasksList}>
      {/* <TasksListItem /> */}
      <div className={Styles.Empty}>
        <EmptyData text="There are no tasks assigned to you" />
      </div>
    </ul>
  );
}

export default TasksList;
