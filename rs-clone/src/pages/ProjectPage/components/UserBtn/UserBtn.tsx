import { useState } from 'react';
import { UserAvatar } from '../';
import { IconType } from 'react-icons';

import styles from './UserBtn.module.scss';

interface UserBtnProps {
  type: 'checkbox' | 'btn';
  title: string;
  content: string | IconType;
  color: string;
}

function UserBtn(props: UserBtnProps) {
  const [checked, setChecked] = useState(false);

  const onClick = () => {
    if (props.type === 'checkbox') {
      setChecked(!checked);
    }
  };

  return (
    <div
      className={
        props.type === 'checkbox' && checked
          ? styles['user-btn'] + ' ' + styles['active']
          : styles['user-btn']
      }
      onClick={onClick}>
      <div className={styles['user-btn__content']}>
        <UserAvatar title={props.title} content={props.content} color={props.color} />
      </div>
    </div>
  );
}

export default UserBtn;
