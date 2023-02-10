import { useEffect, useState, useMemo } from 'react';
import {
  colorBackground,
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight
} from '../../../../../../theme/variables';
import { BtnMenuAction, BtnAction } from '../../../';
import { MdDone, MdClose } from 'react-icons/md';
import useComponentVisible from '../../../../../../hooks/useComponentVisible/useComponentVisible';
import { useBoard } from '../../../../../../Context/Board.context';

import styles from './ColumnHeader.module.scss';

interface ColumnHeaderProps {
  id: string;
  title: string;
  tasksCount: number;
  stickyHeader?: boolean;
  dragStartHandlerColumn: (event: React.DragEvent, column: string) => void;
  dragEndHandlerColumn: (event: React.DragEvent) => void;
  typeCreate?: boolean;
  setIsComponentVisibleCreate?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ColumnHeader(props: ColumnHeaderProps) {
  const { createColumn, updateColumn } = useBoard();
  const [title, setTitle] = useState(props.title);
  const [hoverColumnHeader, setHoverColumnHeader] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [titleError, setTitleError] = useState(props.title.length === 0);

  const optionsBtnMenu = useMemo(() => {
    return [
      {
        title: 'Change',
        callback: () => console.log()
      },
      {
        title: 'Remove',
        callback: () => console.log()
      }
    ];
  }, []);

  const {
    ref,
    isComponentVisible: isInputHeaderVisible,
    setIsComponentVisible: setIsInputHeaderVisible
  } = useComponentVisible(!!props.typeCreate);

  const HeaderBlockStyles = props.stickyHeader
    ? styles['header-block'] + ' ' + styles['sticky']
    : styles['header-block'];

  const onSubmitHandler = () => {
    if (!titleError) {
      if (props.typeCreate) {
        createColumn(title);
      } else {
        updateColumn(props.id, title);
      }
      setIsInputHeaderVisible(false);
    }
  };

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
