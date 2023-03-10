import { useCallback, useEffect, useState } from 'react';
import { MdWarningAmber, MdArrowForward } from 'react-icons/md';
import { SelectPanel } from '../';
import { Option } from '../SelectPanel/SelectPanel';
import { useOverlay, useBoard } from '../../../../../contexts';
import { Loader } from '../../../../../components';

import styles from './PopupDeleteColumn.module.scss';

interface PopupDeleteColumnProps {
  _id: string;
  title: string;
}

function PopupDeleteColumn(props: PopupDeleteColumnProps) {
  const { getColumnList, moveTasksToColumn, deleteColumn } = useBoard();
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();
  const [selectedColumn, setSelectedColumn] = useState('');
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const res = getColumnList().filter((data) => data._id !== props._id);
    setOptions(res.map((data) => ({ text: data.title, value: data._id })));
  }, [getColumnList, props._id, props.title]);

  const onSubmitHandler = useCallback(async () => {
    setChildrenBoard(<Loader />);
    await moveTasksToColumn(props._id, selectedColumn);
    await deleteColumn(props._id);
    setIsVisibleBoard(false);
  }, [selectedColumn]);

  return (
    <div className={styles['pop-up']}>
      <div className={styles['pop-up__title']}>
        <span className={styles['icon']}>
          <MdWarningAmber />
        </span>
        Move tasks from column &#34;
        {(props.title.length >= 10
          ? props.title.substring(0, 9) + '...'
          : props.title
        ).toUpperCase()}
        &#34;
      </div>
      <div className={styles['pop-up__description']}>
        Select a new location for all{' '}
        {(props.title.length >= 10
          ? props.title.substring(0, 9) + '...'
          : props.title
        ).toUpperCase()}{' '}
        jobs.
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
            <div className={styles['value']}>
              {props.title.length >= 10 ? props.title.substring(0, 9) + '...' : props.title}
            </div>
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
