import { useState, useEffect } from 'react';
import classes from './TaskPopUp.module.scss';
import { Link } from 'react-router-dom';
import { BsLink45Deg } from 'react-icons/bs';
import { MdExpandMore } from 'react-icons/md';
import Modal from '../../../../../components/Modal/Modal';
import EditableTitle from '../../../../../components/EditableTitle/EditableTitle';
import DescriptionBlock from './components/DescriptionBlock/DescriptionBlock';
import CommentsBlock from './components/CommentsBlock/CommentsBlock';
import { GrClose } from 'react-icons/gr';
import { TbDots } from 'react-icons/tb';
import BoxWithShadow from '../../../../../components/BoxWithShadow/BoxWithShadow';
import useComponentVisible from '../../../../../hooks/useComponentVisible/useComponentVisible';
import DetailsBlock from './components/DetailsBlock/DetailsBlock';
import { useOverlay } from '../../../../../contexts/Overlay.context';
import { useParams, useNavigate } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import FlipMenu from '../BtnMenuAction/BtnMenuAction';
import { colorLightGrey } from '../../../../../theme/variables';
import { useBoard } from '../../../../../contexts/Board.context';
import { useComments } from '../../../../../contexts/Comments.context';

interface TaskProps {
  _id: string;
  keyTask: string;
}

const TaskPopUp = (props: TaskProps) => {
  const { updateTask, deleteTask, getTaskList, getColumnList } = useBoard();
  const { getCommentsList, getCommentDataBack } = useComments();
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();

  useEffect(() => {
    getCommentDataBack(props._id);
  }, []);
  const list = getCommentsList();
  console.log('list', list);

  const data = getTaskList().filter((task) => {
    if (task._id === props._id) {
      return task;
    }
  });
  const columnsData = getColumnList();
  const column = columnsData.filter((col) => {
    if (col._id === data[0].columnId) return col;
  })[0];

  const clipboard = useClipboard();
  const params = useParams();
  const projectkId = params.id;
  const navigate = useNavigate();

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

  const deleteHandler = () => {
    deleteTask(props._id);
    closeHandler();
  };

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
                <EditableTitle titleProp={data[0].title} callback={updateTask} id={props._id} />
              </div>
              <div className={classes.taskDetails_taskActions}></div>
              <div className={classes.taskDetails_taskDescriptionBlock}>
                <h6 className={classes.taskDetails_descr__title}>Description</h6>
                <DescriptionBlock id={props._id} descript={data[0].description} />
              </div>
              <div className={classes.taskDetails_commentsBlock}>
                <h6 className={classes.taskDetails_descr__title}>Comments</h6>
                <CommentsBlock taskId={props._id} />
              </div>
            </div>
            <div className={classes.taskDetails_col__right}>
              <div className={classes.taskDetails_topLine}>
                <FlipMenu
                  options={[
                    {
                      title: 'Delete',
                      callback: deleteHandler
                    }
                  ]}
                  btnBackgrColorHover={colorLightGrey}
                  btnBackgrColorActive={colorLightGrey}
                />
                <GrClose
                  className={classes.taskDetails_nav + ' ' + classes.stroke}
                  onClick={closeHandler}
                />
              </div>
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
              <DetailsBlock />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default TaskPopUp;