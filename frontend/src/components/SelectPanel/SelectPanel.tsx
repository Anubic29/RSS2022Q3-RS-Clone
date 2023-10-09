import { useCallback, useMemo } from 'react';
import { useComponentVisible } from '../../hooks';

import { MdKeyboardArrowDown } from 'react-icons/md';

import styles from './SelectPanel.module.scss';

export type Option = {
  value: string;
  text: string;
};

interface SelectPanelProps {
  options: Option[];
  onSelect: (value: string) => void;
  selectStyleType?: 'accent';
  selectedItem: number;
  isSelectedHide?: boolean;
}

function SelectPanel(props: SelectPanelProps) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const value = useMemo(() => {
    const idx = props.selectedItem >= 0 ? props.selectedItem : 0;
    return props.options[idx];
  }, [props.options, props.selectedItem]);

  const selectClassName = useMemo(() => {
    let str = styles['select'];
    if (props.selectStyleType) str += ` ${styles['accent']}`;
    return str;
  }, [props.selectStyleType]);

  const options = useMemo(
    () =>
      !props.isSelectedHide
        ? props.options
        : props.options.filter((option) => option.value !== value.value),
    [props.options, props.isSelectedHide, value]
  );

  const onClickHandler = useCallback((option: Option) => {
    setIsComponentVisible(false);
    props.onSelect(option.value);
  }, []);

  return (
    <div className={styles['select-panel']} ref={ref}>
      <div className={selectClassName} onClick={() => setIsComponentVisible(!isComponentVisible)}>
        <div className={styles['text']}>{value.text}</div>
        <span className={styles['icon']}>
          <MdKeyboardArrowDown />
        </span>
      </div>
      {isComponentVisible && (
        <div className={styles['option-list']}>
          {options.map((option, idx) => (
            <div className={styles['option']} key={idx} onClick={() => onClickHandler(option)}>
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectPanel;
