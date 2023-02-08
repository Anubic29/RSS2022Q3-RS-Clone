import { useState } from 'react';
import {
  colorBackground,
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight
} from '../../../../../../theme/variables';
import { BtnMenuAction, BtnAction } from '../../../';
import { MdDone, MdClose } from 'react-icons/md';
import useComponentVisible from '../../../../../../hooks/useComponentVisible/useComponentVisible';

import styles from './ColumnHeader.module.scss';

interface ColumnHeaderProps {
  id: string;
  title: string;
  tasksCount: number;
  stickyHeader?: boolean;
}

function ColumnHeader(props: ColumnHeaderProps) {
  const [title, setTitle] = useState(props.title);
  const [hoverColumnHeader, setHoverColumnHeader] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const {
    ref,
    isComponentVisible: isInputHeaderVisible,
    setIsComponentVisible: setIsInputHeaderVisible
  } = useComponentVisible(false);

  const HeaderBlockStyles = props.stickyHeader
    ? styles['header-block'] + ' ' + styles['sticky']
    : styles['header-block'];

  return (
    <div
      className={HeaderBlockStyles}
      onMouseOver={() => setHoverColumnHeader(true)}
      onMouseOut={() => setHoverColumnHeader(false)}>
      <form className={styles['title__form']} action="">
        {!isInputHeaderVisible ? (
          <span className={styles['title__form__text-backgr']}>
            <span className={styles['title__form__container']}>
              <span
                className={styles['title__form__text']}
                onClick={() => setIsInputHeaderVisible(true)}>
                <span>{title.length >= 10 ? title.substring(0, 9) + '...' : title}</span>
                <span className={styles.tasks}>{props.tasksCount} tasks</span>
              </span>
            </span>
          </span>
        ) : (
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
            <div className={styles['btns-block']}>
              <div className={styles['btn-block']}>
                <BtnAction
                  image={MdDone}
                  backgrColorDefault={colorBackground}
                  backgrColorHover={colorBackgroundColumn}
                  backgrColorActive={colorSecondaryLight}
                />
              </div>
              <div className={styles['btn-block']}>
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
            options={['Change', 'Remove']}
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
