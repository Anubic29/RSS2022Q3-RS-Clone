import ProjectAvatar from '../../../ProjectAvatar/ProjectAvatar';
import { MdOutlineExpandMore } from 'react-icons/md';
import { ProjectAvatarProps } from '../../../ProjectAvatar/ProjectAvatar';
import { Link } from 'react-router-dom';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps extends ProjectAvatarProps {
  id: number;
  title: string;
  description: string;
}

function ProjectCard(props: ProjectCardProps) {
  const { title, description, size, source, bgColor, id } = props;

  const cardStyles = {
    borderColor: `${bgColor}50`
  };

  return (
    <li className={styles.projectCard} style={cardStyles}>
      <div className={styles.titleArea}>
        <ProjectAvatar {...{ size, source, bgColor }} />
        <div className={styles.projectInfo}>
          <Link to={`projects/${id.toString()}`} className={styles.projectTitle}>
            {title}
          </Link>
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
