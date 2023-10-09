import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { removeUserFromProject } from '../../../../redux/projectSlice';
import { removeProject, setLoaderRemoved } from '../../../../redux/projectsSlice';
import { Preloader, ProjectAvatar } from '../../../../components';

import {
  MdOutlineClear,
  MdSettings as SettingsIcon,
  MdOutlineViewColumn as BoardIcon,
  MdOutlineExitToApp
} from 'react-icons/md';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: {
    source: string;
    bgColor: string;
    className?: string;
  };
}

function ProjectCard(props: ProjectCardProps) {
  const { title, description, avatar, id, author } = props;
  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const loaderRemoved = useSelector((state: RootState) => state.projectsSlice.loaderRemoved);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const isLoadingRemoved = useMemo(
    () => loaderRemoved.includes(props.id),
    [loaderRemoved, props.id]
  );

  const deleteProjectHandler = useCallback(() => {
    dispatch(removeProject(id));
  }, [id]);

  const leaveProjectHandler = useCallback(() => {
    if (currentUser) {
      dispatch(setLoaderRemoved(id));
      dispatch(removeUserFromProject(id, currentUser._id));
    }
  }, [id, currentUser?._id]);

  return (
    <li className={styles['card']} style={{ borderColor: `${avatar.bgColor}90` }} id={id}>
      {isLoadingRemoved && (
        <div className={styles['preloader']}>
          <Preloader />
        </div>
      )}

      <div className={styles['header']}>
        <ProjectAvatar className={styles['avatar']} source={avatar.source} typeSize="small" />

        <div className={styles['info']}>
          <Link to={`projects/${id}`} className={styles['title-link']} title={title}>
            {title}
          </Link>

          <p className={styles['description']} title={description}>
            {description}
          </p>
        </div>
      </div>

      <div className={styles['actions']}>
        <p className={styles['title']}>Fast navigation</p>

        <div className={styles['action-list']}>
          <Link to={`projects/${id}`}>
            <div className={styles['action']}>
              <p>Board</p>
              <BoardIcon />
            </div>
          </Link>

          <Link to={`projects/${id}/settings`}>
            <div className={styles['action']}>
              <p>Settings</p>
              <SettingsIcon />
            </div>
          </Link>

          {currentUser && currentUser._id === author ? (
            <div className={styles['action']} onClick={deleteProjectHandler}>
              <p>Delete</p>
              <MdOutlineClear />
            </div>
          ) : (
            <div className={styles['action']} onClick={leaveProjectHandler}>
              <p>Leave</p>
              <MdOutlineExitToApp />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
