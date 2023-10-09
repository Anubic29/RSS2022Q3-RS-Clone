import React, { useMemo, useCallback } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { updateTask } from '../../../../../redux/projectSlice';
import { User } from '../../../../../components';
import { UserDropdown } from '../../../components';

import { MdPerson } from 'react-icons/md';

import styles from './DetailsBlock.module.scss';

interface DetailsBlockProps {
  taskId: string;
  assignee: string;
  author: string;
}

function DetailsBlock(props: DetailsBlockProps) {
  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const userList = useSelector((state: RootState) => state.projectSlice.users);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const emptyUser = useMemo(
    () => ({
      id: 'auto',
      content: MdPerson,
      color: '#A3A3A3',
      name: 'Not assigned'
    }),
    []
  );

  const author = useMemo(() => userList.find((user) => user._id === props.author), [userList]);
  const assignee = useMemo(
    () => userList.find((user) => user._id === props.assignee),
    [userList, props.assignee]
  );

  const assignUser = useCallback((userId: string) => {
    if (userId === 'none') userId = 'auto';
    dispatch(updateTask(props.taskId, { executor: userId }));
  }, []);

  return (
    <div className={styles['details-block']}>
      <h3 className={styles['title']}>Details</h3>
      <div className={styles['details-list']}>
        <div className={styles['detail-item']}>
          <div className={styles['detail-item-title']}>Assignee:</div>
          <div className={styles['assign-block']}>
            <UserDropdown
              users={userList}
              activeUser={props.assignee}
              onSelect={(id) => assignUser(id)}
              emptyUser={emptyUser}
            />
            {!assignee && (
              <button
                className={styles['assign-btn']}
                onClick={() => assignUser(`${currentUser?._id}`)}>
                Assign to me
              </button>
            )}
          </div>
        </div>
        <div className={styles['detail-item']}>
          <div className={styles['detail-item-title']}>Author:</div>
          {author && (
            <User
              content={`${author.firstName} ${author.lastName}`}
              color={author.color}
              name={`${author.firstName} ${author.lastName}`}
              subName={author.email}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsBlock;
