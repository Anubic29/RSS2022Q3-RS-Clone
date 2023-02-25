import { useState, useEffect, useMemo, useCallback } from 'react';
import classes from './TaskPopUp.module.scss';
import { Link } from 'react-router-dom';
import { BsLink45Deg } from 'react-icons/bs';
import { Modal, EditableTitle, BoxWithShadow, BtnMenuAction } from '../../../../../components';
import { MdExpandMore, MdFlag } from 'react-icons/md';
import DescriptionBlock from './components/DescriptionBlock/DescriptionBlock';
import CommentsBlock from './components/CommentsBlock/CommentsBlock';
import { GrClose } from 'react-icons/gr';
import useComponentVisible from '../../../../../hooks/useComponentVisible/useComponentVisible';
import DetailsBlock from './components/DetailsBlock/DetailsBlock';
import { useOverlay, useBoard, useComments } from '../../../../../contexts';
import { useParams, useNavigate } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import { colorLightGrey } from '../../../../../theme/variables';
import type TaskType from '../../../../../types/task/taskType';
import { useUser } from '../../../../../contexts';

interface TaskProps {
  _id: string;
  keyTask: string;
}

const TaskPopUp = (props: TaskProps) => {
  const { updateTask, deleteTask, getTaskList, getColumnList, getUserList } = useBoard();
  const { getCommentsList, getCommentDataBack, getUserData } = useComments();
  const { isNotedItem, addNotedItem, deleteNotedItem } = useUser();
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();
  const [isNoted, setIsNoted] = useState(false);

  const clipboard = useClipboard();
  const params = useParams();
  const projectkId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    getCommentDataBack(props._id);
  }, []);

  useEffect(() => {
    setIsNoted(isNotedItem(props._id));
  }, [isNotedItem, props._id]);

  const dataset = () => {
    const task: TaskType = getTaskList().filter((task) => {
      if (task._id === props._id) {
        return task as TaskType;
      }
    })[0];
    const userList = getUserList();
    const result = {
      _taskId: task._id,
      taskTitle: task.title,
      taskDescript: task.description,
      taskComments: task.commentList,
      taskColumnId: task.columnId,
      taskProjectId: task.projectId,
      authorId: task.author,
      asigneeId: task.executor,
      projectTeam: userList
    };
    return result;
  };

  const data = dataset();

  const columnsData = getColumnList();
  const column = columnsData.filter((col) => {
    if (col._id === data.taskColumnId) return col;
  })[0];

  const [isActive, setIsActive] = useState(false);
  const [taskState, setTaskState] = useState(column);

  const {
    ref,
    isComponentVisible: isMenuVisible,
    setIsComponentVisible: setIsMenuVisible
  } = useComponentVisible(false);

  const isActiveHandler = () => {
    setIsActive(isActive ? false : true);
    setIsMenuVisible(isActive ? false : true);
  };

  useEffect(() => {
    if (!isMenuVisible) setIsActive(false);
  }, [isMenuVisible]);

  const closeHandler = () => {
    setIsVisibleBoard(false);
    setChildrenBoard(null);
    navigate(`/projects/${projectkId}`);
  };

  const taskStateHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    const target = e.target as HTMLTextAreaElement;
    const id = target.getAttribute('value');
    if (id) updateTask(props._id, { columnId: id });
    setTaskState(() => {
      return columnsData.filter((col) => col._id === id)[0];
    });
    setIsMenuVisible(false);
  };

  const onClickHandlerNoted = useCallback(async () => {
    if (!isNoted) {
      await addNotedItem(props._id, 'task');
    } else {
      await deleteNotedItem(props._id);
    }
  }, [addNotedItem, deleteNotedItem, props._id, isNoted]);

  const deleteHandler = () => {
    deleteTask(props._id);
    closeHandler();
  };

  const menuOptions = useMemo(() => {
    return [
      {
        title: !isNoted ? 'Add to Noted List' : 'Remove from Noted List',
        callback: onClickHandlerNoted
      },
      {
        title: 'Remove',
        callback: () => {
          if (isNoted) {
            deleteNotedItem(props._id);
          }
          deleteHandler();
        }
      }
    ];
  }, [deleteHandler, isNoted, onClickHandlerNoted, deleteNotedItem]);

  const url = window.location.href;

  return (
    <>
      <Modal translate="twenty">
        <>
          <div className={classes.taskDetails_wrap}>
            <div className={classes.taskDetails_col__left}>
              <div className={classes.taskDetails_topLine}>
                <Link to="/">
                  <span className={classes.taskDetails_code}>{props.keyTask}</span>
                </Link>
                <input className={classes.copy_input} ref={clipboard.target} value={url} readOnly />
                <button className={classes.copy_button} onClick={clipboard.copy}>
                  <BsLink45Deg className={classes.copy_icon} />
                </button>
              </div>
              <div className={classes.taskDetails_taskName}>
                <EditableTitle titleProp={data.taskTitle} callback={updateTask} id={props._id} />
              </div>
              <div className={classes.taskDetails_taskActions}></div>
              <div className={classes.taskDetails_taskDescriptionBlock}>
                <h6 className={classes.taskDetails_descr__title}>Description</h6>
                <DescriptionBlock id={props._id} descript={data.taskDescript} />
              </div>
              <div className={classes.taskDetails_commentsBlock}>
                <h6 className={classes.taskDetails_descr__title}>Comments</h6>
                <CommentsBlock taskId={props._id} />
              </div>
            </div>
            <div className={classes.taskDetails_col__right}>
              <div className={classes.taskDetails_topLine}>
                <BtnMenuAction
                  options={menuOptions}
                  btnBackgrColorHover={colorLightGrey}
                  btnBackgrColorActive={colorLightGrey}
                />
                <GrClose
                  className={classes.taskDetails_nav + ' ' + classes.stroke}
                  onClick={closeHandler}
                />
              </div>
              <div className={classes.taskDetails_row}>
                <div ref={ref} className={classes.taskDetails_changeStatusBlock}>
                  <button className={classes.taskDetails_changeStatusBtn} onClick={isActiveHandler}>
                    <p className={classes.taskDetails_currentStatusActive}>{taskState.title}</p>
                    <MdExpandMore className={classes.expandArrow} />
                  </button>
                  {isMenuVisible && (
                    <div className={classes.submenu}>
                      <BoxWithShadow>
                        <ul className={classes.taskDetails_currentStatusUl}>
                          {columnsData.map((state) => {
                            if (state._id !== taskState._id) {
                              return (
                                <li
                                  key={state._id}
                                  className={classes.taskDetails_currentStatusLi}
                                  onClick={(e) => taskStateHandler(e)}
                                  value={state._id}>
                                  {state.title}
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </BoxWithShadow>
                    </div>
                  )}
                </div>
                {isNoted && (
                  <div className={classes.taskDetails_flagIcon}>
                    <MdFlag />
                  </div>
                )}
              </div>
              <DetailsBlock
                taskId={data._taskId}
                asignee={data.asigneeId}
                author={data.authorId}
                team={data.projectTeam}
                assignToMe={data.authorId !== data.asigneeId}
              />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default TaskPopUp;
