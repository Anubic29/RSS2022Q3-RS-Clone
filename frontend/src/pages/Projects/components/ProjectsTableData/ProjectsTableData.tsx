import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { removeUserFromProject } from '../../../../redux/projectSlice';
import { removeProject } from '../../../../redux/projectsSlice';
import { addNoted, removeNoted } from '../../../../redux/userSlice';
import { ProjectAvatar, BtnMenuAction, Preloader, User } from '../../../../components';
import UserType from '../../../../types/user/userType';

import { MdStar, MdStarOutline } from 'react-icons/md';

import styles from './ProjectsTableData.module.scss';

interface ProjectsTableDataProps {
  id: string;
  title: string;
  pathImage: string;
  color: string;
  projKey: string;
  description: string;
  author: UserType;
}

function ProjectsTableData(props: ProjectsTableDataProps) {
  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const notedList = useSelector((state: RootState) => state.userSlice.noted);
  const loaderNoted = useSelector((state: RootState) => state.userSlice.loaderNoted);
  const loaderRemoved = useSelector((state: RootState) => state.projectsSlice.loaderRemoved);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const isNoted = useMemo(
    () => notedList.some((data) => data.id === props.id),
    [notedList, props.id]
  );

  const isLoadingNoted = useMemo(() => loaderNoted.includes(props.id), [loaderNoted, props.id]);

  const isLoadingRemoved = useMemo(
    () => loaderRemoved.includes(props.id),
    [loaderRemoved, props.id]
  );

  const options = useMemo(() => {
    const isAuthor = currentUser && currentUser._id === props.author._id;

    return [
      {
        title: isAuthor ? 'Remove Project' : 'Leave Project',
        callback: () => {
          if (isAuthor) dispatch(removeProject(props.id));
          else dispatch(removeUserFromProject(props.id, `${currentUser?._id}`));
        }
      }
    ];
  }, [props.id, currentUser?._id, props.author._id]);

  const onClickHandler = useCallback(() => {
    if (currentUser) {
      if (!isNoted) dispatch(addNoted(currentUser._id, props.id, 'project'));
      else dispatch(removeNoted(currentUser._id, props.id));
    }
  }, [props.id, isNoted, currentUser?._id]);

  return (
    <tr className={styles['project']}>
      <td className={styles['cell']}>
        {isLoadingNoted ? (
          <Preloader />
        ) : (
          <span
            className={isNoted ? `${styles['btn-block']} ${styles['active']}` : styles['btn-block']}
            onClick={onClickHandler}>
            {isNoted ? <MdStar /> : <MdStarOutline />}
          </span>
        )}
      </td>
      <td className={styles['cell']}>
        <Link className={styles['link-block']} to={props.id}>
          <ProjectAvatar
            className={styles['project-icon']}
            source={props.pathImage}
            typeSize="small"
          />
          <span className={styles['title']}>{props.title}</span>
        </Link>
      </td>
      <td className={styles['cell']}>{props.projKey}</td>
      <td className={styles['cell']}>{props.description}</td>
      <td className={styles['cell']}>
        <User
          content={`${props.author.firstName} ${props.author.lastName}`}
          color={props.author.color}
          name={`${props.author.firstName} ${props.author.lastName}`}
          subName={props.author.email}
        />
      </td>
      <td className={`${styles['cell']} ${styles['menu-cell']}`}>
        <BtnMenuAction options={options} />
        {isLoadingRemoved && (
          <div className={styles['preloader']}>
            <Preloader />
          </div>
        )}
      </td>
    </tr>
  );
}

export default ProjectsTableData;
