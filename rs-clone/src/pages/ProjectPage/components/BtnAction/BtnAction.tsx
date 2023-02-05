import { useState } from 'react';
import { IconType } from 'react-icons';

import styles from './BtnAction.module.scss';

interface BtnActionProps {
  image: IconType;
  color?: string;
  title?: string;
}

function BtnAction(props: BtnActionProps) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className={styles.btn}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <props.image size={24} color={props.color || 'black'} />
      {hover && props.title && <div className={styles['btn__title']}>{props.title}</div>}
    </li>
  );
}

export default BtnAction;
