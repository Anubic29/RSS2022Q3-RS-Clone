import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { List } from '../../../../components';
import { ProjectCard } from '..';

import styles from './ProjectsList.module.scss';

function ProjectsList() {
  const projectsList = useSelector((state: RootState) => state.projectsSlice.projects);

  return (
    <List
      isLoading={false}
      count={projectsList.length}
      textLoader="Loading projects..."
      textEmpty={'There are no projects'}>
      <ul className={styles['list']}>
        {projectsList.map((project) => {
          const avatar = {
            source: project.pathImage,
            bgColor: project.color
          };

          return (
            <ProjectCard
              id={project._id}
              title={project.title}
              description={project.description}
              avatar={avatar}
              author={project.author}
              key={project._id}
            />
          );
        })}
      </ul>
    </List>
  );
}

export default ProjectsList;
