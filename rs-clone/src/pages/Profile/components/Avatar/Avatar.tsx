import React from 'react';
import classes from './Avatar.module.scss';
import { convertLetterToHex } from '../../../../utils/convertLetterToHex';

type avatarPropType = {
  letters: string;
};

function Avatar(props: avatarPropType) {
  const colorPart1 = convertLetterToHex(props.letters[0], 3, '9');
  const colorPart2 = convertLetterToHex(props.letters[1], 3, '9');
  return (
    <div className={classes.avatar_wrap} style={{ backgroundColor: `#${colorPart1}${colorPart2}` }}>
      <div className={classes.avatar_inner}>{props.letters.toUpperCase()}</div>
    </div>
  );
}

export default Avatar;
