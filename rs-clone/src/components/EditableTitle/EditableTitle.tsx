import { useState, useRef } from 'react';
import styles from './EditableTitle.module.scss';
import { MdDone, MdClear } from 'react-icons/md';
import React from 'react';

type EditableTitleProps = {
  titleProp: string;
  callback: (_id: string, updateData: { [string: string]: string }) => void;
  id: string;
};

const EditableTitle = ({ titleProp, callback, id }: EditableTitleProps) => {
  const [canEditTitle, setCanEditTitle] = useState(false);
  const [title, setTitle] = useState(titleProp);
  const [memoTitle, setMemoTitle] = useState(title);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <form className={styles['info__title__form']} action="">
        {!canEditTitle ? (
          <span className={styles['info__title__form__text-backgr']}>
            <span
              className={styles['info__title__form__text']}
              onClick={() => {
                setCanEditTitle(true);
                if (ref.current) ref.current.classList.add(`${styles.visible}`);
              }}>
              {title.length >= 34 ? title.substring(0, 33) + '...' : title}
            </span>
          </span>
        ) : (
          <>
            <input
              className={styles['info__title__form__input']}
              type="text"
              autoFocus
              value={title}
              onClick={(e) => e.stopPropagation()}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              onBlur={() => {
                setCanEditTitle(false);
                if (ref.current) ref.current.classList.remove(`${styles.visible}`);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setCanEditTitle(false);
                  callback(id, { title });
                }
              }}
            />
          </>
        )}
        <div ref={ref} className={`${styles.editTitle_buttons}`}>
          <div
            className={styles.corfirmBtn + ' ' + styles.btn}
            onMouseDown={() => {
              callback(id, { title });
              setMemoTitle(title);
              if (ref.current) ref.current.classList.remove(`${styles.visible}`);
            }}>
            <MdDone />
          </div>
          <div
            className={styles.cancelBtn + ' ' + styles.btn}
            onMouseDown={() => {
              setCanEditTitle(false);
              setTitle(memoTitle);
              console.log(memoTitle);
            }}>
            <MdClear />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditableTitle;
