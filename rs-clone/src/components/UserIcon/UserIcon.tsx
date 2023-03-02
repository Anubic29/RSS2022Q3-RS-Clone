import React from 'react';
import classes from './UserIcon.module.scss';
import { convertLetterToHex } from '../../utils/convertLetterToHex';
import FaUserCircle from 'react-icons/fa';

const UserIcon: React.FC<{ userFrst: string; userLast: string }> = (props) => {
  const colorPart1 = convertLetterToHex(props.userFrst[0], 3, '9');
  const colorPart2 = convertLetterToHex(props.userLast[0], 3, '9');
  return (
    <div className={classes.header_profileWrap}>
      <div className={classes.header_profileInner}>
        <div
          className={classes.header_profileIcon}
          style={{ backgroundColor: `#${colorPart1}${colorPart2}` }}>
          <span
            className={
              classes.header_profileName
            }>{`${props.userFrst[0].toUpperCase()}${props.userLast[0].toUpperCase()}`}</span>
        </div>
      </div>
    </div>
  );
};

export default UserIcon;
