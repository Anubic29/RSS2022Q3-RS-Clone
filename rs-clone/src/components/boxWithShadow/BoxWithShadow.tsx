import React from 'react';
import classes from './BoxWithShadow.module.scss';
import classesSub from '../submenuItem/submenuItem.module.scss';

const BoxWithShadow: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={classes.submenu_block}>
      <div className={classesSub.submenu_blockInner}>{props.children}</div>
    </div>
  );
};

export default BoxWithShadow;
