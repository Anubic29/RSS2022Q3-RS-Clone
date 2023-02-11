import { useCallback, useMemo, useState } from 'react';
import { MdDone } from 'react-icons/md';
import { colorBackgroundHover, colorSecondaryLight } from '../../../../../theme/variables';
import { BtnMenuAction, UserAvatar } from '../';
import { useBoard } from '../../../../../contexts/Board.context';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';

import styles from './Task.module.scss';

interface TaskProps {
  _id: string;
  title: string;
  keyTask: string;
  executor: string;
  typeDone?: boolean;
}

function Task(props: TaskProps) {
  const [hoverTask, setHoverTask] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const { getTaskList, getFullNameUser, deleteTask } = useBoard();

  const user = useMemo(() => getFullNameUser(props.executor), [props.executor]);

  const deleteTaskCallback = useCallback(
    () => deleteTask(props._id),
    [props._id, getTaskList().length]
  );
  const optionsBtnMenu = useMemo(() => {
    return [
      {
        title: 'Remove',
        callback: deleteTaskCallback
      }
    ];
  }, [deleteTaskCallback]);

  return (
    <div
      className={styles.task}
      onMouseOver={() => setHoverTask(true)}
      onMouseOut={() => setHoverTask(false)}>
      {(hoverTask || isActiveMenu) && (
        <div className={styles['btn-more']}>
          <BtnMenuAction
            options={optionsBtnMenu}
            btnBackgrColorHover={colorBackgroundHover}
            btnBackgrColorActive={colorSecondaryLight}
            onActiveMenu={(value) => setIsActiveMenu(value)}
          />
        </div>
      )}
      <div className={styles['task__title-block']}>
        <span className={styles.title}>
          {props.title.length >= 24 ? props.title.substring(0, 24) + '...' : props.title}
        </span>
      </div>
      <div className={styles['task__info-block']}>
        <div className={styles.info}>
          <div className={styles['info__type']}>
            <MdDone color="white" />
          </div>
          <div className={styles['info__key']}>{props.keyTask}</div>
        </div>
        <div className={styles['sub-info']}>
          {props.typeDone && (
            <div className={styles['sub-info__icon-done']}>
              <MdDone />
            </div>
          )}
          <div className={styles['user-block']}>
            {props.executor !== 'auto' && user && (
              <UserAvatar
                title={`${user.firstName} ${user.lastName}`}
                content={user.firstName[0] + user.lastName[0]}
                color={`#${convertLetterToHex(user.firstName[0], 3, '9')}${convertLetterToHex(
                  user.lastName[0],
                  3,
                  '9'
                )}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
