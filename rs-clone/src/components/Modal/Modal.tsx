import React, { ReactElement } from 'react';
import classes from './Modal.module.scss';

const Modal: React.FC<{ translate: string; children: ReactElement }> = ({
  translate,
  children
}) => {
  const classN = translate;
  return (
    <>
      <div className={classes.backdrop}>
        <dialog open={true} className={`${classes['modal']} ${classes[`${classN}`]}`}>
          {children}
        </dialog>
      </div>
    </>
  );
};

export default Modal;
