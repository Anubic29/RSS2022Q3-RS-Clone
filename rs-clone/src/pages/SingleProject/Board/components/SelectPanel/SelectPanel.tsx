import { useEffect, useState } from 'react';
import useComponentVisible from '../../../../../hooks/useComponentVisible/useComponentVisible';
import { MdKeyboardArrowDown } from 'react-icons/md';

import styles from './SelectPanel.module.scss';

export type Option = {
  value: string;
  text: string;
};

interface SelectPanelProps {
  title?: string;
  options: Option[];
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

function SelectPanel(props: SelectPanelProps) {
  const [value, setValue] = useState<Option>(props.options[0]);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  useEffect(() => {
    setValue(props.options[0]);
  }, [props.options]);

  useEffect(() => {
    setIsComponentVisible(false);
    props.setSelectedValue(value?.value);
  }, [value]);

  return (
    <div className={styles['select-panel']} ref={ref}>
      {props.title && <span className={styles['select-panel__text']}>{props.title}</span>}
      <div
        className={styles['select-panel__select']}
        onClick={() => setIsComponentVisible(!isComponentVisible)}>
        {value?.text}
        <span className={styles['icon']}>
          <MdKeyboardArrowDown />
        </span>
      </div>
      {isComponentVisible && (
        <div className={styles['select-panel__option-list']}>
          {props.options.map((option, idx) => (
            <div
              className={styles['select-panel__option']}
              key={idx}
              onClick={() => setValue(option)}>
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectPanel;
