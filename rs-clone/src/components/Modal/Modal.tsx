import React, { ReactElement } from 'react';
import classes from './Modal.module.scss';

const Modal: React.FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <>
      <div className={classes.backdrop}>
        <dialog open={true} className={classes.modal}>
          {children}
        </dialog>
      </div>
    </>
  );
};

export default Modal;
