import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';

import styles from './BtnAction.module.scss';

interface BtnActionProps {
  image: IconType;
  colorImg?: string;
  title?: string;
  backgrColorDefault?: string;
  backgrColorHover: string;
  backgrColorActive: string;
  backgrColorImportant?: string;
}

function BtnAction(props: BtnActionProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  let backgrColor = props.backgrColorDefault ?? 'transparent';

  useEffect(() => {
    setActive(false);
  }, [hover]);

  if (hover) {
    backgrColor = props.backgrColorHover;
    if (active) {
      backgrColor = props.backgrColorActive;
    }
  }
  backgrColor = props.backgrColorImportant ?? backgrColor;

  return (
    <div
      className={styles.btn}
      style={{ backgroundColor: backgrColor }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <props.image size={24} color={props.colorImg || 'black'} />
      {hover && props.title && <div className={styles['btn__title']}>{props.title}</div>}
    </div>
  );
}

export default BtnAction;
