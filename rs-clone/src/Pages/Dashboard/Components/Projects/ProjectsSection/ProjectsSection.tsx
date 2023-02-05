import { ProjectsList } from '../..';

import Styles from './ProjectsSection.module.scss';

function ProjectsSection() {
  return (
    <section className={Styles.Projects}>
      <div className="container">
        <div className={Styles.ProjectsTitleArea}>
          <h2 className={Styles.ProjectsTitle}>All your projects</h2>
          <a className={Styles.CreateProjectLink} href="#">
            Create project
          </a>
        </div>
        <ProjectsList />
      </div>
    </section>
  );
}

export default ProjectsSection;
