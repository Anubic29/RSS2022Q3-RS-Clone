import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineClear, MdArrowRightAlt } from 'react-icons/md';
import { ProjectAvatarProps } from '../../../../../components/ProjectAvatar/ProjectAvatar';
import { Preloader, ProjectAvatar } from '../../../../../components';
import { useProjects } from '../../../../../contexts';
import { deleteProject } from '../../../../../api/allProjects';
import { ProjectsContextValue } from '../../../../../contexts/ProjectsContext';
import Styles from './ProjectCard.module.scss';

interface ProjectCardProps extends ProjectAvatarProps {
  id: string;
  title: string;
  description: string;
}

function ProjectCard(props: ProjectCardProps) {
  const { title, description, size, source, bgColor, id } = props;
  const { projects, setProjects } = useProjects() as ProjectsContextValue;
  const [isLoading, setIsLoading] = useState(false);

  const deleteProjectHandler = async (event: React.MouseEvent) => {
    try {
      const target = event.target as HTMLElement;
      const id = (target.closest(`.${Styles.ProjectCard}`) as HTMLElement).id;

      setIsLoading(true);
      await deleteProject(id);
      setProjects(projects.filter((project) => project._id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const cardStyles = {
    borderColor: `${bgColor}50`
  };

  return (
    <li className={Styles.ProjectCard} style={cardStyles} id={id}>
      {isLoading && (
        <div className={Styles.PreloaderContainer}>
          <Preloader />
        </div>
      )}

      <div className={Styles.TitleArea}>
        <ProjectAvatar className={Styles.Avatar} {...{ size, source, bgColor }} />

        <div className={Styles.ProjectInfo}>
          <Link to={`projects/${id}`}>
            <p className={Styles.ProjectTitle}>{title}</p>
          </Link>

          <p className={Styles.ProjectDescription} title={description}>
            {description}
          </p>
        </div>
      </div>

      <div className={Styles.ActionsArea}>
        <div className={Styles.Actions}>
          <Link to={`projects/${id}`}>Move to project</Link>
          <MdArrowRightAlt />
        </div>

        <div className={Styles.Actions} onClick={deleteProjectHandler}>
          Delete
          <MdOutlineClear />
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
