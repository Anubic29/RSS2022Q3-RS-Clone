import React from 'react';
import classes from './UserIcon.module.scss';
import { convertLetterToHex } from '../../utils/convertLetterToHex';

const UserIcon: React.FC<{ user: string }> = (props) => {
  const user = props.user.split(' ');
  const colorPart1 = convertLetterToHex(user[0], 3, '9');
  const colorPart2 = convertLetterToHex(user[0], 3, '9');
  return (
    <div className={classes.header_profileWrap}>
      <div className={classes.header_profileInner}>
        <div
          className={classes.header_profileIcon}
          style={{ backgroundColor: `#${colorPart1}${colorPart2}` }}>
          <span className={classes.header_profileName}>{props.user}</span>
        </div>
      </div>
    </div>
  );
};

export default UserIcon;
