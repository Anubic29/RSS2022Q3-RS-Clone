import Styles from './ProjectAvatar.module.scss';

export interface ProjectAvatarProps {
  size: number;
  source: string;
  bgColor: string;
  className?: string;
}

function ProjectAvatar(props: ProjectAvatarProps) {
  const { size, source, bgColor, className } = props;
  const containerStyles = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: bgColor
  };
  const classNames = className
    ? `${Styles.projectAvatarContainer} ${className}`
    : Styles.projectAvatarContainer;

  return (
    <div className={classNames} style={containerStyles}>
      <img
        className={Styles.projectAvatar}
        src={source}
        alt="Project avatar"
        width="75%"
        height="75%"
      />
    </div>
  );
}

export default ProjectAvatar;
