import React from 'react';
import { useEffect, useState } from 'react';
import { ProjectCard } from '../..';
import { EmptyData, Preloader } from '../../../../../components';
import { useProjects, useUser } from '../../../../../contexts';

import styles from './ProjectsList.module.scss';
import { useAlerts } from '../../../../../contexts/AlertsContext';

const PROJECT_BADGE_SIZE = 24;

function ProjectsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [customMessage, setCustomMessage] = useState('There are no projects');
  const { currentUser } = useUser();
  const { projects, getProjects } = useProjects();
  const { addAlert } = useAlerts();

  useEffect(() => {
    if (currentUser) {
      (async (_id: string) => {
        try {
          await getProjects(_id);
        } catch {
          setCustomMessage(`Server error`);
          addAlert('Error', 'Sever error. Unable to load projects');
        } finally {
          setIsLoading(false);
        }
      })(currentUser._id);
    }
  }, [currentUser]);

  return (
    <>
      {isLoading ? (
        <div className={styles.Empty}>
          <Preloader text={'Loading projects...'} />
        </div>
      ) : projects.length ? (
        <ul className={styles.ProjectsList}>
          {projects.map((project) => {
            return (
              <ProjectCard
                id={project._id}
                title={project.title}
                description={project.description}
                source={project.pathImage}
                bgColor={project.color}
                size={PROJECT_BADGE_SIZE}
                key={project._id}
              />
            );
          })}
        </ul>
      ) : (
        <div className={styles.Empty}>
          <EmptyData text={customMessage} />
        </div>
      )}
    </>
  );
}

export default ProjectsList;
