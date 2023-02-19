import React from 'react';
import classes from './UserIcon.module.scss';

const UserIcon: React.FC<{ user: string }> = (props) => {
  return (
    <div className={classes.header_profileWrap}>
      <div className={classes.header_profileInner}>
        <div className={classes.header_profileIcon}>
          <span className={classes.header_profileName}>{props.user}</span>
        </div>
      </div>
    </div>
  );
};

export default UserIcon;
