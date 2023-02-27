import React, { useEffect, useState } from 'react';
import classes from './OwnProjects.module.scss';
import { useUser } from '../../../../contexts';
import { useProjects } from '../../../../contexts';
import ProjectType from '../../../../types/project/projectType';
import ProjectRow from '../ProjectRow/ProjectRow';

function OwnProjects() {
  const { ...uData } = useUser();
  const { ...projData } = useProjects();

  const [projectsList, setProjectsList] = useState<ProjectType[]>([]);

  useEffect(() => {
    setProjectsList(projData.projects);
  }, [projData.projects, projectsList]);

  return (
    <div className={classes.teamProjects_wrap}>
      <div className={classes.teamProjects_inner}>
        {projectsList.length > 0 &&
          projectsList.map((project) => {
            if (project.author === uData.currentUser?._id) {
              return ProjectRow(project);
            }
          })}
      </div>
    </div>
  );
}

export default OwnProjects;
