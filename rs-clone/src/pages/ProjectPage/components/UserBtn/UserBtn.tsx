import { useState } from 'react';
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
  const [hover, setHover] = useState(false);

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
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className={styles['user-btn__content']} style={{ backgroundColor: props.color }}>
        {typeof props.content === 'string' ? props.content : <props.content size={25} />}
      </div>
      {hover && <div className={styles['user-btn__title']}>{props.title}</div>}
    </div>
  );
}

export default UserBtn;
