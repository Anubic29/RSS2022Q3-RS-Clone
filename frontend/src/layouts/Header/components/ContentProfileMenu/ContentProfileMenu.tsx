import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setIsToken } from '../../../../redux/signInUpSlice';
import { resetUserData } from '../../../../redux/userSlice';
import { resetProjectsData } from '../../../../redux/projectsSlice';
import { UserAvatar } from '../../../../components';

import styles from './ContentProfileMenu.module.scss';

interface ContentProfileMenuProps {
  onCloseHandler: () => void;
}

function ContentProfileMenu(props: ContentProfileMenuProps) {
  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const dispatch = useDispatch();

  const logOutHandler = useCallback(() => {
    dispatch(resetUserData());
    dispatch(resetProjectsData());
    dispatch(setIsToken(false));
    props.onCloseHandler();
  }, [props.onCloseHandler]);

  return (
    <div className={styles['main-block']}>
      <h2 className={`${styles['padding']} ${styles['title']}`}>ACCOUNT</h2>
      <div className={`${styles['padding']} ${styles['user']}`}>
        <UserAvatar
          content={`${currentUser?.firstName} ${currentUser?.lastName}`}
          color={`${currentUser?.color}`}
          className={styles['avatar']}
        />
        <div className={styles['user-info']}>
          <p
            className={
              styles['full-name']
            }>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
          <p className={styles['email']}>{`${currentUser?.email}`}</p>
        </div>
      </div>
      <hr className={styles['hr']} />
      <h2 className={`${styles['padding']} ${styles['title']}`}>JIRA</h2>
      <div className={styles['link-list']}>
        <Link
          to="/profile"
          className={`${styles['padding']} ${styles['link']}`}
          onClick={props.onCloseHandler}>
          Profile
        </Link>
      </div>
      <hr className={styles['hr']} />
      <Link
        className={`${styles['padding']} ${styles['last-link']}`}
        onClick={logOutHandler}
        to="/">
        LOG OUT
      </Link>
    </div>
  );
}

export default ContentProfileMenu;
