import ProjectsList from '../ProjectsList/ProjectsList';

import styles from './ProjectsSection.module.scss';

function ProjectsSection() {
  return (
    <div className={styles.projectsSection}>
      <div className="container">
        <div className={styles.titleArea}>
          <h2 className={styles.projectsTitle}>All your projects</h2>
          <a className={styles.createProjectLink} href="#">
            Create project
          </a>
        </div>
        <ProjectsList />
      </div>
    </div>
  );
}

export default ProjectsSection;
