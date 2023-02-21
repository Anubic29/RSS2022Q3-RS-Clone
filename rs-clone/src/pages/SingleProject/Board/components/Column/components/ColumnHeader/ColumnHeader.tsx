import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  colorBackground,
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight
} from '../../../../../../../theme/variables';
import { MdDone, MdClose } from 'react-icons/md';
import useComponentVisible from '../../../../../../../hooks/useComponentVisible/useComponentVisible';
import { useBoard } from '../../../../../../../contexts/Board.context';
import { useOverlay } from '../../../../../../../contexts';
import { PopupDeleteColumn } from '../../../';
import { Preloader, BtnMenuAction, BtnAction } from '../../../../../../../components';
import { usePartOverlay } from '../../../../../../../contexts';
import Loader from '../../../../../../../components/Loader/Loader';

import styles from './ColumnHeader.module.scss';

interface ColumnHeaderProps {
  id: string;
  title: string;
  tasksCount: number;
  stickyHeader?: boolean;
  dragStartHandlerColumn: (event: React.DragEvent, column: string) => void;
  dragEndHandlerColumn: (event: React.DragEvent) => void;
  typeDone?: boolean;
  typeCreate?: boolean;
  setIsComponentVisibleCreate?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ColumnHeader(props: ColumnHeaderProps) {
  const { createColumn, updateColumn, deleteAllTaskInColumn, deleteColumn, getColumnCount } =
    useBoard();
  const { setChildrenBoard, setIsVisibleBoard } = useOverlay();
  const { setChildrenColumnList, setIsVisibleColumnList } = usePartOverlay();
  const [title, setTitle] = useState('');
  const [hoverColumnHeader, setHoverColumnHeader] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [isLoaderGoing, setIsLoaderGoing] = useState(false);
  const [afterLoadingIcon, setAfterLoadingIcon] = useState(false);

  useEffect(() => setTitle(props.title), [props.title]);

  const optionsBtnMenu = useMemo(() => {
    return [
      {
        title: 'Remove All Tasks',
        callback: async () => {
          setChildrenColumnList(<Loader />);
          setIsVisibleColumnList(true);
          await deleteAllTaskInColumn(props.id);
          setIsVisibleColumnList(false);
        }
      },
      {
        title: 'Remove',
        callback: async () => {
          if (props.tasksCount > 0) {
            setChildrenBoard(<PopupDeleteColumn _id={props.id} title={props.title} />);
            setIsVisibleBoard(true);
          } else {
            setChildrenColumnList(<Loader />);
            setIsVisibleColumnList(true);
            await deleteColumn(props.id);
            setIsVisibleColumnList(false);
          }
        },
        blocked: getColumnCount() === 1
      }
    ];
  }, [props.id, props.tasksCount, deleteAllTaskInColumn, deleteColumn, getColumnCount]);

  const {
    ref,
    isComponentVisible: isInputHeaderVisible,
    setIsComponentVisible: setIsInputHeaderVisible
  } = useComponentVisible(!!props.typeCreate);

  const HeaderBlockStyles = props.stickyHeader
    ? styles['header-block'] + ' ' + styles['sticky']
    : styles['header-block'];

  const onSubmitHandler = useCallback(async () => {
    if (!titleError) {
      setIsInputHeaderVisible(false);
      if (props.typeCreate) {
        setChildrenColumnList(<Loader />);
        setIsVisibleColumnList(true);
        await createColumn(title);
        setIsVisibleColumnList(false);
      } else {
        setIsLoaderGoing(true);
        console.log(title);
        const answer = await updateColumn(props.id, { title });
        setIsLoaderGoing(false);
        if (answer) {
          setAfterLoadingIcon(true);
          setTimeout(() => setAfterLoadingIcon(false), 1000);
        }
      }
    }
  }, [createColumn, updateColumn, title, titleError, props.typeCreate, props.id]);

  useEffect(() => {
    if (!isInputHeaderVisible) setTitle(props.title);
    if (props.setIsComponentVisibleCreate && !isInputHeaderVisible)
      props.setIsComponentVisibleCreate(false);
  }, [isInputHeaderVisible]);

  useEffect(() => {
    setTitleError(title.length === 0);
  }, [title]);

  return (
    <div
      className={HeaderBlockStyles}
      onMouseOver={() => setHoverColumnHeader(true)}
      onMouseOut={() => setHoverColumnHeader(false)}>
      <form
        className={styles['title__form']}
        action=""
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitHandler();
        }}>
        {!isInputHeaderVisible && (
          <span
            className={styles['title__form__text-backgr']}
            onDragStart={(event) => props.dragStartHandlerColumn(event, props.id)}
            onDragEnd={(event) => props.dragEndHandlerColumn(event)}
            draggable={true}>
            <span className={styles['title__form__container']}>
              <span
                className={styles['title__form__text']}
                onClick={() => setIsInputHeaderVisible(true)}>
                <span>{title.length >= 10 ? title.substring(0, 9) + '...' : title}</span>
                <span className={styles.tasks}>{props.tasksCount} tasks</span>
              </span>
              <span className={styles['form-loader']}>
                {isLoaderGoing && <Preloader text="" />}
                {afterLoadingIcon && <MdDone />}
              </span>
              {props.typeDone && (
                <div className={styles['title__form__icon-done']}>
                  <MdDone />
                </div>
              )}
            </span>
          </span>
        )}
        {isInputHeaderVisible && (
          <div className={styles['content']} ref={ref}>
            <input
              className={styles['title__form__input']}
              type="text"
              autoFocus
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            {titleError && (
              <span className={styles['error-message']}>Column title can&apos;t be empty</span>
            )}
            <div className={styles['btns-block']}>
              <div className={styles['btn-block']} onClick={() => onSubmitHandler()}>
                <BtnAction
                  image={MdDone}
                  backgrColorDefault={colorBackground}
                  backgrColorHover={colorBackgroundColumn}
                  backgrColorActive={colorSecondaryLight}
                />
              </div>
              <div className={styles['btn-block']} onClick={() => setIsInputHeaderVisible(false)}>
                <BtnAction
                  image={MdClose}
                  backgrColorDefault={colorBackground}
                  backgrColorHover={colorBackgroundColumn}
                  backgrColorActive={colorSecondaryLight}
                />
              </div>
            </div>
          </div>
        )}
      </form>
      {!isInputHeaderVisible && (isActiveMenu || hoverColumnHeader) && (
        <div className={styles['btn-more']}>
          <BtnMenuAction
            options={optionsBtnMenu}
            btnBackgrColorHover={colorBackgroundHover}
            btnBackgrColorActive={colorSecondaryLight}
            onActiveMenu={(value) => setIsActiveMenu(value)}
          />
        </div>
      )}
    </div>
  );
}

export default ColumnHeader;
