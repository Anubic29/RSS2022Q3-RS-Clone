import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { EmptyData } from '../../../../components';
import { RecentProject } from './components';

import styles from './ContentRecentProjects.module.scss';

interface ContentRecentProjectsProps {
  onCloseHandler: () => void;
}

function ContentRecentProjects(props: ContentRecentProjectsProps) {
  const recentList = useSelector((state: RootState) => state.userSlice.recentProjects);
  const projectsList = useSelector((state: RootState) => state.projectsSlice.projects);

  const lastLinks = useMemo(
    () => [
      {
        text: 'All projects',
        path: '/projects',
        onClick: props.onCloseHandler
      },
      {
        text: 'Create',
        path: '/create-project',
        onClick: props.onCloseHandler
      }
    ],
    [props.onCloseHandler]
  );

  return (
    <div className={styles['main-block']}>
      <h3 className={`${styles['padding']} ${styles['title']}`}>Recently viewed</h3>
      <div className={`${styles['content']}`}>
        {recentList.length === 0 ? (
          <EmptyData text="You haven't view any projects recently" className={styles['empty']} />
        ) : (
          projectsList
            .filter((project) => recentList.includes(project._id))
            .map((project) => (
              <RecentProject
                key={`recent-${project._id}`}
                id={project._id}
                title={project.title}
                image={project.pathImage}
                onClick={props.onCloseHandler}
              />
            ))
        )}
      </div>
      <hr className={styles['hr']} />
      {lastLinks.map((link, idx) => (
        <Link
          key={`recent-menu-last-link-${idx}`}
          className={`${styles['padding']} ${styles['last-link']}`}
          onClick={link.onClick}
          to={link.path}>
          {link.text}
        </Link>
      ))}
    </div>
  );
}

export default ContentRecentProjects;
