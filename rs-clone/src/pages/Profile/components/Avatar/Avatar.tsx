import React from 'react';
import classes from './Avatar.module.scss';

type avatarPropType = {
  letters: string;
};

function Avatar(props: avatarPropType) {
  return (
    <div className={classes.avatar_wrap}>
      <div className={classes.avatar_inner}>{props.letters.toUpperCase()}</div>
    </div>
  );
}

export default Avatar;
