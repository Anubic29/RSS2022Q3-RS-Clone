import { useEffect, useState } from 'react';
import { TasksListItem } from '../..';
import { EmptyData, Preloader } from '../../../../../components';

import styles from './TasksList.module.scss';

function TasksList() {
  const [isLoading, setIsLoading] = useState(true);
  const testCondition = true;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.Empty}>
          <Preloader text="Loading tasks..." />
        </div>
      ) : (
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
      )}
    </>
  );
}

export default TasksList;
