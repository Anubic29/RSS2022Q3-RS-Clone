import { useState } from 'react';
import { IconType } from 'react-icons';

import styles from './UserAvatar.module.scss';

interface UserAvatarProps {
  title?: string;
  content: string | IconType;
  color: string;
}

function UserAvatar(props: UserAvatarProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles['user-avatar']}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className={styles['user-avatar__content']} style={{ backgroundColor: props.color }}>
        {typeof props.content === 'string' ? props.content : <props.content size={25} />}
      </div>
      {props.title && hover && <div className={styles['user-avatar__title']}>{props.title}</div>}
    </div>
  );
}

export default UserAvatar;
