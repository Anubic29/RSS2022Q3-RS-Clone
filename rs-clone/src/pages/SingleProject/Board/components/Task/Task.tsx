import { useCallback, useMemo, useState, useEffect } from 'react';
import { MdDone } from 'react-icons/md';
import { colorBackgroundHover, colorSecondaryLight } from '../../../../../theme/variables';
import { BtnMenuAction, UserAvatar } from '../';
import { useBoard } from '../../../../../contexts/Board.context';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';
import { useOverlay } from '../../../../../contexts/Overlay.context';
import TaskPopUp from '../TaskPopUp/TaskPopUp';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Task.module.scss';
import { Preloader } from '../../../../../components';

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
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);

  const user = useMemo(() => getFullNameUser(props.executor), [props.executor, getFullNameUser]);

  const navigate = useNavigate();
  const params = useParams();

  const showModal = () => {
    setIsVisibleBoard(true);
    setChildrenBoard(<TaskPopUp _id={props._id} keyTask={props.keyTask} />);
    navigate(`selected-task/${props.keyTask}`);
  };
  useEffect(() => {
    if (params.taskId) {
      setIsVisibleBoard(true);
      setChildrenBoard(<TaskPopUp _id={props._id} keyTask={props.keyTask} />);
    }
  }, []);

  const deleteTaskCallback = useCallback(async () => {
    setIsLoadingRemove(true);
    await deleteTask(props._id);
    setIsLoadingRemove(false);
  }, [props._id, getTaskList().length]);

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
      onClick={() => showModal()}
      className={styles.task}
      onMouseOver={() => setHoverTask(true)}
      onMouseOut={() => setHoverTask(false)}>
      {(hoverTask || isActiveMenu) && (
        <div onClick={(e) => e.stopPropagation()} className={styles['btn-more']}>
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
      {isLoadingRemove && (
        <div className={styles['block-loader']}>
          <Preloader />
        </div>
      )}
    </div>
  );
}

export default Task;
