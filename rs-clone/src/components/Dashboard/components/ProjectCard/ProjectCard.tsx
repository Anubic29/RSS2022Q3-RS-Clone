import { ProjectAvatar } from '../../../index';
import styles from './ProjectCard.module.scss';

function ProjectCard() {
  return (
    <li className={styles.projectCard}>
      <div className={styles.titleArea}>
        <ProjectAvatar
          size={24}
          source="https://cdn-icons-png.flaticon.com/512/1088/1088537.png"
          bgColor="#FF0000"
        />
        <div className={styles.projectInfo}>
          <h3 className={styles.projectTitle}>Project title</h3>
          <p className={styles.projectDescription}>Description</p>
        </div>
      </div>
      <div className={styles.actionsArea}>Actions</div>
    </li>
  );
}

export default ProjectCard;
