import { useState } from 'react';
import { UserAvatar } from '../../../../../components';
import { IconType } from 'react-icons';
import { useBoard } from '../../../../../contexts';

import styles from './UserBtn.module.scss';

interface UserBtnProps {
  _id?: string;
  type: 'checkbox' | 'btn';
  title: string;
  content: string | IconType;
  color: string;
  onClick?: () => void;
}

function UserBtn(props: UserBtnProps) {
  const { addUserFilter, deleteUserFilter } = useBoard();
  const [checked, setChecked] = useState(false);

  const onClick = () => {
    if (props.type === 'checkbox' && props._id) {
      setChecked(!checked);
      if (!checked) addUserFilter(props._id);
      else deleteUserFilter(props._id);
    } else if (props.type === 'btn' && props.onClick) {
      props.onClick();
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
