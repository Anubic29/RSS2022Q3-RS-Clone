import React, { ReactElement } from 'react';
import classes from './ContourBox.module.scss';

function ContourBox(props: { children: ReactElement }) {
  return <div className={classes.box_wrap}>{props.children}</div>;
}

export default ContourBox;
