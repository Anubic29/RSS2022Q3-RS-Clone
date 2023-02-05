import { MdOutlineExpandMore } from 'react-icons/md';
import { ProjectAvatarProps } from '../../../../../Components/ProjectAvatar/ProjectAvatar';
import { ProjectAvatar } from '../../../../../Components';

import Styles from './ProjectCard.module.scss';

interface ProjectCardProps extends ProjectAvatarProps {
  id: number;
  title: string;
  description: string;
}

function ProjectCard(props: ProjectCardProps) {
  const { title, description, size, source, bgColor } = props;

  const cardStyles = {
    borderColor: `${bgColor}50`
  };

  return (
    <li className={Styles.ProjectCard} style={cardStyles}>
      <div className={Styles.TitleArea}>
        <ProjectAvatar {...{ size, source, bgColor }} />
        <div className={Styles.ProjectInfo}>
          <a className={Styles.ProjectTitle}>{title}</a>
          <p className={Styles.ProjectDescription}>{description}</p>
        </div>
      </div>
      <div className={Styles.ActionsArea}>
        <div className={Styles.Actions}>
          Actions
          <MdOutlineExpandMore />
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
