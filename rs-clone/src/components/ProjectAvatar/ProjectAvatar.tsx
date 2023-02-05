import classes from './ProjectAvatar.module.scss';

export interface ProjectAvatarProps {
  size: number;
  source: string;
  bgColor: string;
}

function ProjectAvatar(props: ProjectAvatarProps) {
  const { size, source, bgColor } = props;
  const containerStyles = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: bgColor
  };

  return (
    <div className={classes.projectAvatarContainer} style={containerStyles}>
      <img
        className={classes.projectAvatar}
        src={source}
        alt="Project avatar"
        width="75%"
        height="75%"
      />
    </div>
  );
}

export default ProjectAvatar;
