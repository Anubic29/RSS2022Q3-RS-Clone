import { ReactNode, useState, useEffect } from 'react';
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

interface TaskProps {
  _id: string;
  title: string;
  keyTask: string;
  executor: string;
  typeDone?: boolean;
}

const TaskPopUp = (props: TaskProps) => {
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();
  const data = {
    title: props.title,
    keyTask: props.keyTask,
    id: props._id,
    executor: props.executor
  };

  const clipboard = useClipboard();
  const params = useParams();
  const projectkId = params.id;
  const navigate = useNavigate();

  const taskStates = ['dev ready', 'in review', 'in dev', 'done'];

  const [isActive, setIsActive] = useState(false);
  const [taskState, setTaskState] = useState('in dev');
  const [dotsMenuActive, setDotsMenuActive] = useState(false);

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
    setTaskState(() => target.getAttribute('value') as string);
    setIsMenuVisible(false);
  };

  // window.onclick = function () {
  //   if (isMenuVisible) setIsMenuVisible(false);
  // };

  const dotsHandler = () => {
    setDotsMenuActive(dotsMenuActive ? false : true);
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
                  <span className={classes.taskDetails_code}>{data.keyTask}</span>
                </Link>
                <input className={classes.copy_input} ref={clipboard.target} value={url} readOnly />
                <button className={classes.copy_button} onClick={clipboard.copy}>
                  <BsLink45Deg className={classes.copy_icon} />
                </button>
              </div>
              <div className={classes.taskDetails_taskName}>
                <EditableTitle titleProp={data.title} />
              </div>
              <div className={classes.taskDetails_taskActions}></div>
              <div className={classes.taskDetails_taskDescriptionBlock}>
                <h6 className={classes.taskDetails_descr__title}>Description</h6>
                <DescriptionBlock />
              </div>
              <div className={classes.taskDetails_commentsBlock}>
                <h6 className={classes.taskDetails_descr__title}>Comments</h6>
                <CommentsBlock />
              </div>
            </div>
            <div className={classes.taskDetails_col__right}>
              <div className={classes.taskDetails_topLine}>
                <div className={classes.dotsMenu}>
                  <TbDots className={classes.taskDetails_nav} onClick={dotsHandler} />
                  {dotsMenuActive && (
                    <div className={classes.dotsMenu_wrap}>
                      <BoxWithShadow>
                        <ul className={classes.taskDetails_currentStatusUl}>
                          <li className={classes.taskDetails_currentStatusLi}>Clone</li>
                          <li className={classes.taskDetails_currentStatusLi}>delete</li>
                        </ul>
                      </BoxWithShadow>
                    </div>
                  )}
                </div>
                <GrClose
                  className={classes.taskDetails_nav + ' ' + classes.stroke}
                  onClick={closeHandler}
                />
              </div>
              <div ref={ref} className={classes.taskDetails_changeStatusBlock}>
                <button className={classes.taskDetails_changeStatusBtn} onClick={isActiveHandler}>
                  <p className={classes.taskDetails_currentStatusActive}>{taskState}</p>
                  <MdExpandMore className={classes.expandArrow} />
                </button>
                {isMenuVisible && (
                  <div className={classes.submenu}>
                    <BoxWithShadow>
                      <ul className={classes.taskDetails_currentStatusUl}>
                        {taskStates.map((state) => {
                          if (state !== taskState) {
                            return (
                              <li
                                key={state}
                                className={classes.taskDetails_currentStatusLi}
                                onClick={(e) => taskStateHandler(e)}
                                value={state}>
                                {state}
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