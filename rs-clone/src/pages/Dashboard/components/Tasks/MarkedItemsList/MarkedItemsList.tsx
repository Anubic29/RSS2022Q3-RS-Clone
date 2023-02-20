import { EmptyData } from '../../../../../components';
import { MarkedItem } from '../..';

import styles from './MarkedItemsList.module.scss';
import React from 'react';

function MarkedItemsList() {
  const testCondition = true;

  return (
    <>
      {testCondition ? (
        <ul className={styles.MarkedItemsList}>
          <MarkedItem type="Task" depProject="Company BDSM Code" title="Task" />
          <MarkedItem type="Board" depProject="Company BDSM Code" title="Board" />
        </ul>
      ) : (
        <div className={styles.Empty}>
          <EmptyData text="There are no marked items" />
        </div>
      )}
    </>
  );
}

export default MarkedItemsList;
