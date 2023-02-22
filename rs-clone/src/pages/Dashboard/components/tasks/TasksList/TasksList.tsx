import React, { useEffect, useState } from 'react';
import { TasksListItem } from '../..';
import { EmptyData, Preloader } from '../../../../../components';
import { useTasks } from '../../../../../contexts/TasksContext';
import { useAlerts } from '../../../../../contexts/AlertsContext';

import styles from './TasksList.module.scss';
import { useProjects } from '../../../../../contexts';

function TasksList() {
  const [isLoading, setIsLoading] = useState(true);
  const { tasks, getTasks } = useTasks();
  const { projects } = useProjects();
  const { addAlert } = useAlerts();

  useEffect(() => {
    (async () => {
      try {
        await getTasks();
      } catch {
        addAlert('Error', 'Server error. Unable to load tasks. Try again later');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [projects]);

  return (
    <>
      {isLoading ? (
        <div className={styles.Empty}>
          <Preloader text="Loading tasks..." />
        </div>
      ) : (
        <>
          {tasks.length ? (
            <ul className={styles.TasksList}>
              {tasks.map((task) => {
                return <TasksListItem {...task} key={task._id} taskId={task._id} />;
              })}
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
