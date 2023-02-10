import { Link } from 'react-router-dom';
import { MdOutlineClear, MdArrowRightAlt } from 'react-icons/md';
import { ProjectAvatarProps } from '../../../../../Components/ProjectAvatar/ProjectAvatar';
import { ProjectAvatar } from '../../../../../Components';
import Styles from './ProjectCard.module.scss';

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
    <>
      <li className={Styles.ProjectCard} style={cardStyles}>
        <div className={Styles.TitleArea}>
          <ProjectAvatar className={Styles.Avatar} {...{ size, source, bgColor }} />
          <div className={Styles.ProjectInfo}>
            <Link to={`projects/${id}`}>
              <p className={Styles.ProjectTitle}>{title}</p>
            </Link>
            <p className={Styles.ProjectDescription}>{description}</p>
          </div>
        </div>
        <div className={Styles.ActionsArea}>
          <div className={Styles.Actions}>
            <Link to={`projects/${id}`}>Move to project</Link>
            <MdArrowRightAlt />
          </div>
          <div className={Styles.Actions}>
            Delete
            <MdOutlineClear />
          </div>
        </div>
      </li>
    </>
  );
}

export default ProjectCard;
