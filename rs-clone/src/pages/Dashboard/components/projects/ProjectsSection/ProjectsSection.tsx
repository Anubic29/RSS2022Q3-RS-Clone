import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectsList } from '../..';

import Styles from './ProjectsSection.module.scss';

function ProjectsSection() {
  return (
    <section className={Styles.Projects}>
      <div className="container">
        <div className={Styles.ProjectsTitleArea}>
          <h2 className={Styles.ProjectsTitle}>All your projects</h2>
          <Link className={Styles.CreateProjectLink} to="create-project">
            Create project
          </Link>
        </div>
        <ProjectsList />
      </div>
    </section>
  );
}

export default ProjectsSection;
