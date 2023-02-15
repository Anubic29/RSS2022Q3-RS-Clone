import { useCallback, useEffect, useState } from 'react';
import { MdWarningAmber, MdArrowForward } from 'react-icons/md';
import { SelectPanel } from '../';
import { Option } from '../SelectPanel/SelectPanel';
import { useBoard } from '../../../../../contexts/Board.context';
import { useOverlay } from '../../../../../contexts';

import styles from './PopupDeleteColumn.module.scss';

interface PopupDeleteColumnProps {
  _id: string;
  title: string;
}

function PopupDeleteColumn(props: PopupDeleteColumnProps) {
  const { getColumnList, moveTasksToColumn, deleteColumn } = useBoard();
  const { setIsVisibleBoard } = useOverlay();
  const [selectedColumn, setSelectedColumn] = useState('');
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const res = getColumnList().filter((data) => data._id !== props._id);
    setOptions(res.map((data) => ({ text: data.title, value: data._id })));
  }, [getColumnList, props._id, props.title]);

  const onSubmitHandler = useCallback(() => {
    moveTasksToColumn(props._id, selectedColumn);
    deleteColumn(props._id);
    setIsVisibleBoard(false);
  }, [selectedColumn]);

  return (
    <div className={styles['pop-up']}>
      <div className={styles['pop-up__title']}>
        <span className={styles['icon']}>
          <MdWarningAmber />
        </span>
        Move tasks from column &#34;{props.title.toUpperCase()}&#34;
      </div>
      <div className={styles['pop-up__description']}>
        Select a new location for all {props.title.toUpperCase()} jobs.
      </div>
      <div className={styles['pop-up__content']}>
        <div className={styles['pop-up__content__row']}>
          <div className={styles['pop-up__content__col']}>
            <div className={styles['title']}>This column will be removed:</div>
          </div>
          <div className={styles['separator']}></div>
          <div className={styles['pop-up__content__col']}>
            <div className={styles['title']}> New task location:</div>
          </div>
        </div>
        <div className={styles['pop-up__content__row']}>
          <div className={styles['pop-up__content__col']}>
            <div className={styles['value']}>{props.title}</div>
          </div>
          <div className={styles['separator']}>
            <MdArrowForward />
          </div>
          <div className={styles['pop-up__content__col']}>
            <SelectPanel options={options} setSelectedValue={setSelectedColumn} />
          </div>
        </div>
      </div>
      <div className={styles['pop-up__btns-block']}>
        <div
          className={styles['btn-block'] + ' ' + styles['btn-block--danger']}
          onClick={onSubmitHandler}>
          Remove
        </div>
        <div className={styles['btn-block']} onClick={() => setIsVisibleBoard(false)}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default PopupDeleteColumn;
