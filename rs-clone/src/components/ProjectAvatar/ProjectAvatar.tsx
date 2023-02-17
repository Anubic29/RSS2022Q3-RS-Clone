import styles from './ProjectAvatar.module.scss';

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
    ? `${styles.projectAvatarContainer} ${className}`
    : styles.projectAvatarContainer;

  return (
    <div className={classNames} style={containerStyles}>
      <img
        className={styles.projectAvatar}
        src={source}
        alt="Project avatar"
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default ProjectAvatar;
