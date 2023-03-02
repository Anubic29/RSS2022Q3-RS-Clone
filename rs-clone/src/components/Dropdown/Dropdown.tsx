import React from 'react';
import { useEffect, useState } from 'react';

import styles from './Dropdown.module.scss';

interface DropdownChild {
  title: string;
  onClick: () => void;
}

interface DropdownButtonProps {
  childElements: DropdownChild[];
}

function DropdownButton(props: DropdownButtonProps) {
  const { childElements } = props;
  const [display, setDisplay] = useState('none');
  const [isActive, setIsActive] = useState(false);

  const onClickHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (display === 'flex') {
      setDisplay('none');
      setIsActive(false);
    } else if (display === 'none' && target.closest('#dropdown')) {
      setDisplay('flex');
      setIsActive(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClickHandler);

    return () => {
      document.removeEventListener('click', onClickHandler);
    };
  }, [display]);

  return (
    <div className={styles.DropdownContainer}>
      <div className={isActive ? styles.DropdownActive : styles.Dropdown} id="dropdown">
        <span className={styles.DropdownItem}></span>
        <span className={styles.DropdownItem}></span>
        <span className={styles.DropdownItem}></span>
      </div>

      <ul className={styles.DropdownElementsList} style={{ display }}>
        {childElements.map((element, index) => {
          return (
            <li className={styles.DropdownElement} key={index} onClick={element.onClick}>
              {element.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropdownButton;
