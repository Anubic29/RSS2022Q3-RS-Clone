import React from 'react';
import classes from './BoxWithShadow.module.scss';

const BoxWithShadow: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={classes.submenu_block}>
      <div className={classes.submenu_blockInner}>{props.children}</div>
    </div>
  );
};

export default BoxWithShadow;
