import React from 'react';
import { Link } from 'react-router-dom';
import ContourBox from '../../../../components/ContourBox/ContourBox';
import ProjectType from '../../../../types/project/projectType';
import classes from './ProjectRow.module.scss';

const ProjectRow = (project: ProjectType) => {
  return (
    <div key={project._id}>
      <ContourBox>
        <div className={classes.projectRow_wrap}>
          <div className={classes.projectRow_image}>
            <img src={`${project.pathImage}`}></img>
          </div>
          <p className={classes.projectRow_title}>
            <Link to={`/projects/${project._id}/board`}>{project.title}</Link>
          </p>
        </div>
      </ContourBox>
    </div>
  );
};

export default ProjectRow;
