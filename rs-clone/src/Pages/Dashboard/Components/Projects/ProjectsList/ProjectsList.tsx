import { ProjectCard } from '../..';
import { EmptyData, Preloader } from '../../../../../Components';
import { useProjects } from '../../../../../contexts';
import { ProjectsContextValue } from '../../../../../contexts/ProjectsContext';
import Styles from './ProjectsList.module.scss';
import { useEffect, useState } from 'react';
import { getProjects } from '../../../../../api/allProjects';

function ProjectsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [customMessage, setCustomMessage] = useState('There are no projects');
  const { projects, setProjects } = useProjects() as ProjectsContextValue;

  useEffect(() => {
    (async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (err) {
        setCustomMessage(`Server error`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={Styles.Empty}>
          <Preloader text={'Loading data...'} />
        </div>
      ) : projects.length ? (
        <ul className={Styles.ProjectsList}>
          {projects.map((project) => {
            return (
              <ProjectCard
                id={project._id}
                title={project.title}
                description={project.description}
                source={project.pathImage}
                bgColor={'#ffff00'}
                size={24}
                key={project._id}
              />
            );
          })}
        </ul>
      ) : (
        <div className={Styles.Empty}>
          <EmptyData text={customMessage} iconSizeInPx="24px" />
        </div>
      )}
    </>
  );
}

export default ProjectsList;
