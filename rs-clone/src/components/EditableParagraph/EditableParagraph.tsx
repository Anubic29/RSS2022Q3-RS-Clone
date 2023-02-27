import React, { useState, useRef, useEffect } from 'react';
import { MdDone, MdClear } from 'react-icons/md';
import styles from './EditableParagraph.module.scss';
import BoxWithShadow from '../BoxWithShadow/BoxWithShadow';

type EditableTitleProps = {
  titleProp: string;
  callback: (_id: string, updateData: { [string: string]: string }) => void;
  id: string;
  field: 'jobTitleInfo' | 'departmentInfo' | 'organizationInfo' | 'locationInfo';
};

const EditableParagraph = ({ titleProp, callback, id, field }: EditableTitleProps) => {
  const [canEditTitle, setCanEditTitle] = useState(false);
  const [title, setTitle] = useState(titleProp);
  useEffect(() => {
    setTitle(titleProp);
  }, [titleProp]);
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
              {title.length >= 34 ? title.substring(0, 95) + '...' : title}
            </span>
          </span>
        ) : (
          <>
            <input
              className={styles['info__title__form__input']}
              type="text"
              autoFocus
              placeholder="Enter text"
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
                  callback(id, { [field]: title });
                  if (ref.current) ref.current.classList.remove(`${styles.visible}`);
                }
              }}
            />
          </>
        )}
        <div ref={ref} className={`${styles.editTitle_buttons}`}>
          <BoxWithShadow>
            <div
              className={styles.corfirmBtn + ' ' + styles.btn}
              onMouseDown={() => {
                callback(id, { [field]: title });
                if (ref.current) ref.current.classList.remove(`${styles.visible}`);
              }}>
              <MdDone />
            </div>
          </BoxWithShadow>
          <BoxWithShadow>
            <div
              className={styles.cancelBtn + ' ' + styles.btn}
              onMouseDown={() => {
                setCanEditTitle(false);
              }}>
              <MdClear />
            </div>
          </BoxWithShadow>
        </div>
      </form>
    </>
  );
};

export default EditableParagraph;
