import { useEffect, useState } from 'react';
import Styles from './Dropdown.module.scss';

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
    <div className={Styles.DropdownContainer}>
      <div className={isActive ? Styles.DropdownActive : Styles.Dropdown} id="dropdown">
        <span className={Styles.DropdownItem}></span>
        <span className={Styles.DropdownItem}></span>
        <span className={Styles.DropdownItem}></span>
      </div>
      <ul className={Styles.DropdownElementsList} style={{ display }}>
        {childElements.map((element, index) => {
          return (
            <li className={Styles.DropdownElement} key={index} onClick={element.onClick}>
              {element.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropdownButton;
