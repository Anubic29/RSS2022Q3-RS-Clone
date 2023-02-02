import ProjectAvatar from '../../../ProjectAvatar/ProjectAvatar';
import { MdOutlineExpandMore } from 'react-icons/md';
import { ProjectAvatarProps } from '../../../ProjectAvatar/ProjectAvatar';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps extends ProjectAvatarProps {
  title: string;
  description: string;
}

function ProjectCard(props: ProjectCardProps) {
  const { title, description, size, source, bgColor } = props;

  const cardStyles = {
    borderColor: `${bgColor}50`
  };

  return (
    <li className={styles.projectCard} style={cardStyles}>
      <div className={styles.titleArea}>
        <ProjectAvatar {...{ size, source, bgColor }} />
        <div className={styles.projectInfo}>
          <p className={styles.projectTitle}>{title}</p>
          <p className={styles.projectDescription}>{description}</p>
        </div>
      </div>
      <div className={styles.actionsArea}>
        <div className={styles.actions}>
          Actions
          <MdOutlineExpandMore />
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
