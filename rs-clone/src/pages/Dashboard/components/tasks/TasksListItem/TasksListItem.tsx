import { MdCheckBox as TaskIcon } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { useProjects } from '../../../../../contexts';
import { Link } from 'react-router-dom';
import { useAlerts } from '../../../../../contexts/AlertsContext';
import ProjectType from '../../../../../types/project/projectType';

import styles from './TasksListItem.module.scss';
import { Preloader } from '../../../../../components';

interface TasksListItemProps {
  projectId: string;
  title: string;
  columnId: string;
  taskId: string;
}

function TasksListItem(props: TasksListItemProps) {
  const { projectId, title, columnId, taskId } = props;
  const { getProject } = useProjects();
  const { addAlert } = useAlerts();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [column, setColumn] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const fetchedProject = await getProject(projectId);
        const taskColumn = fetchedProject.columnList.find(
          (column) => column?._id === columnId
        )?.title;

        setProject(fetchedProject);
        setColumn(taskColumn as string);
      } catch {
        addAlert('Error', `Server error. Unable to load task ${taskId}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className={styles.ItemWrapper}>
      {isLoading && (
        <div className={styles.PreloaderContainer}>
          <Preloader />
        </div>
      )}
      <Link to={`projects/${projectId}/selected-task/${taskId}`}>
        <li className={styles.TaskItem}>
          <TaskIcon className={styles.TaskIcon} />

          <div className={styles.Content}>
            <div className={styles.TitleArea}>
              <div className={styles.TaskTitle}>{title}</div>

              <div className={styles.ProjectInfo}>
                <span>{project?.key}</span>
                <span className={styles.Separator}></span>
                <span>{project?.title}</span>
              </div>
            </div>

            <p className={styles.ProjectColumn}>{column}</p>
          </div>

          <div className={styles.Empty}></div>
        </li>
      </Link>
    </div>
  );
}

export default TasksListItem;
