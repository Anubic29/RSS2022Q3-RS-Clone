import { useEffect, useState } from 'react';
import { ProjectCard } from '../..';
import { EmptyData, Preloader } from '../../../../../components';
import { useProjects } from '../../../../../contexts';
import { ProjectsContextValue } from '../../../../../contexts/ProjectsContext';

import styles from './ProjectsList.module.scss';

const PROJECT_BADGE_SIZE = 24;

function ProjectsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [customMessage, setCustomMessage] = useState('There are no projects');
  const { projects, getProjects } = useProjects() as ProjectsContextValue;

  useEffect(() => {
    (async () => {
      try {
        await getProjects();
      } catch {
        setCustomMessage(`Server error`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.Empty}>
          <Preloader text={'Loading data...'} />
        </div>
      ) : projects.length ? (
        <ul className={styles.ProjectsList}>
          {projects.map((project) => {
            return (
              <ProjectCard
                _id={project._id}
                id={project.key}
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
