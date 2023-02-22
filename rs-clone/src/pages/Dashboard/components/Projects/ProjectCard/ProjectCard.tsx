import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineClear, MdArrowRightAlt, MdSettings as SettingsIcon } from 'react-icons/md';
import { ProjectAvatarProps } from '../../../../../components/ProjectAvatar/ProjectAvatar';
import { Preloader, ProjectAvatar } from '../../../../../components';
import { useProjects } from '../../../../../contexts';
import { ProjectsContextValue } from '../../../../../contexts/ProjectsContext';
import { useAlerts } from '../../../../../contexts/AlertsContext';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps extends ProjectAvatarProps {
  id: string;
  title: string;
  description: string;
}

const getTransparentBorderColor = (color: string) => `${color}90`;

function ProjectCard(props: ProjectCardProps) {
  const { title, description, size, source, bgColor, id } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { deleteProject } = useProjects() as ProjectsContextValue;
  const { addAlert } = useAlerts();

  const deleteProjectHandler = async (event: React.MouseEvent) => {
    try {
      const target = event.target as HTMLElement;
      const id = (target.closest(`.${styles.ProjectCard}`) as HTMLElement).id;

      setIsLoading(true);
      await deleteProject(id);
      addAlert('Success', 'Project was deleted successfully');
    } catch {
      addAlert('Error', 'Server error. Can`t remove project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      className={styles.ProjectCard}
      style={{ borderColor: getTransparentBorderColor(bgColor) }}
      id={id}>
      {isLoading && (
        <div className={styles.PreloaderContainer}>
          <Preloader />
        </div>
      )}

      <div className={styles.TitleArea}>
        <ProjectAvatar className={styles.Avatar} {...{ size, source, bgColor }} />

        <div className={styles.ProjectInfo}>
          <Link to={`projects/${id}`}>
            <p className={styles.ProjectTitle}>{title}</p>
          </Link>

          <p className={styles.ProjectDescription} title={description}>
            {description}
          </p>
        </div>
      </div>

      <div className={styles.ProjectActions}>
        <p className={styles.ActionsTitle}>Fast navigation</p>

        <div className={styles.ActionsArea}>
          <Link to={`projects/${id}`}>
            <div className={styles.Actions}>
              <p>Go to project</p>
              <MdArrowRightAlt />
            </div>
          </Link>

          <Link to={`projects/${id}/settings`}>
            <div className={styles.Actions}>
              <p>Settings</p>
              <SettingsIcon />
            </div>
          </Link>

          <div className={styles.Actions} onClick={deleteProjectHandler}>
            <p>Delete</p>
            <MdOutlineClear />
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
