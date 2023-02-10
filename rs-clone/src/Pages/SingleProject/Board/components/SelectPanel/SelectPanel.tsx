import { useEffect, useState } from 'react';
import useComponentVisible from '../../../../../hooks/useComponentVisible/useComponentVisible';
import { MdKeyboardArrowDown } from 'react-icons/md';

import styles from './SelectPanel.module.scss';

type Option = {
  value: string;
  text: string;
};

interface SelectPanelProps {
  title: string;
  options: Option[];
}

function SelectPanel(props: SelectPanelProps) {
  const [value, setValue] = useState(props.options[0].text);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  useEffect(() => {
    setIsComponentVisible(false);
  }, [value]);

  return (
    <div className={styles['select-panel']} ref={ref}>
      <span className={styles['select-panel__text']}>{props.title}</span>
      <div
        className={styles['select-panel__select']}
        onClick={() => setIsComponentVisible(!isComponentVisible)}>
        {value}
        <MdKeyboardArrowDown />
      </div>
      {isComponentVisible && (
        <div className={styles['select-panel__option-list']}>
          {props.options.map((option, idx) => (
            <div
              className={styles['select-panel__option']}
              data-value={option.value}
              key={idx}
              onClick={() => {
                setValue(option.text);
                setIsComponentVisible(false);
              }}>
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectPanel;
