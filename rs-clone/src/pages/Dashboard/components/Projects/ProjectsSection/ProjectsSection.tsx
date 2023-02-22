import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectsList } from '../..';

import Styles from './ProjectsSection.module.scss';
import { useAlerts } from '../../../../../contexts/AlertsContext';

function ProjectsSection() {
  const { removeAllAlerts } = useAlerts();

  return (
    <section className={Styles.Projects}>
      <div className="container">
        <div className={Styles.ProjectsTitleArea}>
          <h2 className={Styles.ProjectsTitle}>All your projects</h2>
          <Link
            className={Styles.CreateProjectLink}
            to="create-project"
            onClick={() => removeAllAlerts()}>
            Create project
          </Link>
        </div>
        <ProjectsList />
      </div>
    </section>
  );
}

export default ProjectsSection;
