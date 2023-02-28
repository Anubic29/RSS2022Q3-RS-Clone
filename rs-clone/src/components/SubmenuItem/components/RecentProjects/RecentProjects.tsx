import React, { useEffect, useState } from 'react';
import BoxWithShadow from '../../../BoxWithShadow/BoxWithShadow';
import { useProjects, useUser } from '../../../../contexts';
import classes from './RecentProjects.module.scss';
import { useNavigate } from 'react-router-dom';
import ProjectType from '../../../../types/project/projectType';
import RecentProjectRow from './components/RecentProjectRow';

function RecentProjects(props: { onVisHandler: () => void }) {
  const { ...uData } = useUser();
  const { ...projData } = useProjects();

  const [user, setUser] = useState(uData.currentUser);
  const [projectsList, setProjectsList] = useState<ProjectType[]>(projData.projects);
  const [recentList, setRecentList] = useState(uData.recentList);

  const navigate = useNavigate();

  useEffect(() => {
    setRecentList(uData.recentList);
  }, [uData.currentUser, uData.recentList, recentList]);

  useEffect(() => {
    setUser(uData.currentUser);
  }, [uData.currentUser, user]);

  useEffect(() => {
    setProjectsList(projData.projects);
  }, [projData.projects, projectsList]);

  return (
    <div className={`${classes.profileMenu_wrap}`}>
      <BoxWithShadow>
        <div className={classes.profileMenu_inner}>
          <div className={`${classes.itemsBlock}`}>
            <h2>RECENTLY VIEWED</h2>
            {recentList.length > 0 &&
              projectsList
                .filter((project) => recentList.includes(project._id))
                .map((project) => {
                  return RecentProjectRow(project);
                })}
          </div>
          <hr></hr>
          <p
            className={`${classes.profileMenu_row} ${classes.profileMenu_row__logOut}`}
            onClick={() => {
              props.onVisHandler();
              navigate('/projects');
            }}>
            All projects
          </p>
        </div>
        <p></p>
      </BoxWithShadow>
    </div>
  );
}

export default RecentProjects;
