import { useState } from 'react';
import styles from './EditableTitle.module.scss';

type EditableTitleProps = {
  titleProp: string;
};

const EditableTitle = ({ titleProp }: EditableTitleProps) => {
  const [canEditTitle, setCanEditTitle] = useState(false);
  const [title, setTitle] = useState(titleProp);

  return (
    <form className={styles['info__title__form']} action="">
      {!canEditTitle ? (
        <span className={styles['info__title__form__text-backgr']}>
          <span className={styles['info__title__form__text']} onClick={() => setCanEditTitle(true)}>
            {title.length >= 34 ? title.substring(0, 33) + '...' : title}
          </span>
        </span>
      ) : (
        <input
          className={styles['info__title__form__input']}
          type="text"
          autoFocus
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          onBlur={() => setCanEditTitle(false)}
        />
      )}
    </form>
  );
};

export default EditableTitle;
