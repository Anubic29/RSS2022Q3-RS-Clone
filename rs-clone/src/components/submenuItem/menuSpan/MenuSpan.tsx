import React from 'react';
import classes from './menuSpan.module.scss';

const MenuSpan: React.FC<{ text: string }> = (props) => {
  return <span className={classes.header_menuText}>{props.text}</span>;
};

export default MenuSpan;
