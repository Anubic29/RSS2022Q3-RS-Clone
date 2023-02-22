import {
  MdOutlineViewColumn as BoardIcon,
  MdCheckBox as TaskIcon,
  MdOutlineStar as StarIcon
} from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { useProjects } from '../../../../../contexts';
import { useTasks } from '../../../../../contexts/TasksContext';
import TaskType from '../../../../../types/task/taskType';
import ProjectType from '../../../../../types/project/projectType';
import { Link } from 'react-router-dom';
import { Preloader } from '../../../../../components';
import { useAlerts } from '../../../../../contexts/AlertsContext';

import styles from './MarkedItem.module.scss';

interface MarkedItemProps {
  type: 'task' | 'project';
  _id: string;
}

const ICONS_MAP = {
  task: <TaskIcon className={styles.TypeIcon} />,
  project: <BoardIcon className={styles.TypeIcon} />
};

function MarkedItem(props: MarkedItemProps) {
  const { type, _id } = props;
  const { getProject, projects } = useProjects();
  const { getTask, removeNotedItem } = useTasks();
  const { addAlert } = useAlerts();
  const [task, setTask] = useState<TaskType | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [project, setProject] = useState<ProjectType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (type === 'project') {
          setProject(await getProject(_id));
        } else {
          setTask(await getTask(_id));
          setProjectTitle(projects.find((proj) => proj._id === task?.projectId)?.title as string);
        }

        setIsLoading(false);
      } catch {
        addAlert('Error', `Server error. Unable to load item ${_id}`);
      }
    })();
  }, []);

  const removeItemHandler = async (event: React.MouseEvent) => {
    event.preventDefault();

    setIsLoading(true);
    await removeNotedItem(_id);
    setIsLoading(false);
  };

  return (
    <div className={styles.ItemWrapper}>
      {isLoading && (
        <div className={styles.PreloaderContainer}>
          <Preloader />
        </div>
      )}

      <Link
        to={
          type === 'project'
            ? `projects/${_id}`
            : `projects/${task?.projectId}/selected-task/${task?._id}`
        }>
        <li className={styles.TaskItem}>
          <div className={styles.IconsContainer}>
            <StarIcon
              className={styles.StarIcon}
              title="Remove from marked"
              onClick={removeItemHandler}
            />
            {ICONS_MAP[type]}
          </div>

          <div className={styles.Content}>
            <div className={styles.TitleArea}>
              <div className={styles.Title}>
                {type === 'project' ? project?.title : task?.title}
              </div>

              <div className={styles.Info}>
                <span>{type === 'project' ? 'Project' : 'Task'}</span>
                {type !== 'project' && <span className={styles.Separator}></span>}
                {type !== 'project' && <span>in {projectTitle}</span>}
              </div>
            </div>
          </div>
        </li>
      </Link>
    </div>
  );
}

export default MarkedItem;
