import React from 'react';
import classes from './BoxWithShadow.module.scss';

const BoxWithShadow: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = (props) => {
  const inherit = props.className;
  console.log(inherit);
  return (
    <div className={`${classes.submenu_block} ${inherit ? classes[inherit] : ''}`}>
      {props.children}
    </div>
  );
};

export default BoxWithShadow;
