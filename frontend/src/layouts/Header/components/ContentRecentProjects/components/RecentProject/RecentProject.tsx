import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { addNoted, removeNoted } from '../../../../../../redux/userSlice';
import { Preloader } from '../../../../../../components';

import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import styles from './RecentProject.module.scss';

interface RecentProjectProps {
  id: string;
  title: string;
  image: string;
  onClick?: () => void;
}

function RecentProject(props: RecentProjectProps) {
  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const notedList = useSelector((state: RootState) => state.userSlice.noted);
  const loaderNoted = useSelector((state: RootState) => state.userSlice.loaderNoted);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const isNoted = useMemo(
    () => notedList.some((data) => data.id === props.id),
    [notedList, props.id]
  );

  const isLoadingNoted = useMemo(() => loaderNoted.includes(props.id), [loaderNoted, props.id]);

  const noteProject = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      event.preventDefault();
      if (currentUser) {
        if (!isNoted) dispatch(addNoted(currentUser._id, props.id, 'project'));
        else dispatch(removeNoted(currentUser._id, props.id));
      }
    },
    [currentUser, isNoted, props.id]
  );

  return (
    <Link to={`/projects/${props.id}/board`} className={styles['project']} onClick={props.onClick}>
      <img className={styles['image']} src={props.image}></img>
      <span className={styles['title']}>{props.title}</span>
      <div className={styles['action-block']}>
        {isLoadingNoted ? (
          <Preloader />
        ) : (
          <div className={styles['btn-note']} onClick={noteProject}>
            {isNoted ? <AiFillStar className={styles['active']} /> : <AiOutlineStar />}
          </div>
        )}
      </div>
    </Link>
  );
}

export default RecentProject;
