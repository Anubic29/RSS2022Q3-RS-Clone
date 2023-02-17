import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineClear, MdArrowRightAlt } from 'react-icons/md';
import { ProjectAvatarProps } from '../../../../../components/ProjectAvatar/ProjectAvatar';
import { Preloader, ProjectAvatar } from '../../../../../components';
import { useProjects } from '../../../../../contexts';
import { deleteProject } from '../../../../../api/allProjects';
import { ProjectsContextValue } from '../../../../../contexts/ProjectsContext';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps extends ProjectAvatarProps {
  _id: string;
  id: string;
  title: string;
  description: string;
}

const getTransparentBorderColor = (color: string) => `${color}50`;

function ProjectCard(props: ProjectCardProps) {
  const { title, description, size, source, bgColor, id, _id } = props;
  const { projects, setProjects } = useProjects() as ProjectsContextValue;
  const [isLoading, setIsLoading] = useState(false);

  const deleteProjectHandler = async (event: React.MouseEvent) => {
    try {
      const target = event.target as HTMLElement;
      const id = (target.closest(`.${styles.ProjectCard}`) as HTMLElement).id;

      setIsLoading(true);
      await deleteProject(id);
      setProjects(projects.filter((project) => project._id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      className={styles.ProjectCard}
      style={{ borderColor: getTransparentBorderColor(bgColor) }}
      id={_id}>
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

      <div className={styles.ActionsArea}>
        <div className={styles.Actions}>
          <Link to={`projects/${id}`}>Move to project</Link>
          <MdArrowRightAlt />
        </div>

        <div className={styles.Actions} onClick={deleteProjectHandler}>
          <p>Delete</p>
          <MdOutlineClear />
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
