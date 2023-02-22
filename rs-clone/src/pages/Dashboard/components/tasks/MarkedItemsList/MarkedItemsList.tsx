import { EmptyData, Preloader } from '../../../../../components';
import { MarkedItem } from '../..';
import { useTasks } from '../../../../../contexts/TasksContext';
import { useEffect, useState } from 'react';
import { useAlerts } from '../../../../../contexts/AlertsContext';

import styles from './MarkedItemsList.module.scss';

function MarkedItemsList() {
  const { notedItems, getNotedItems } = useTasks();
  const { addAlert } = useAlerts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await getNotedItems();
      } catch {
        addAlert('Error', 'Server error. Unable to load marked items. Try again later');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.Empty}>
          <Preloader text="Loading marked items..." />
        </div>
      ) : notedItems.length ? (
        <ul className={styles.MarkedItemsList}>
          {notedItems.map((item) => {
            return (
              <MarkedItem type={item.type as 'task' | 'project'} _id={item.id} key={item._id} />
            );
          })}
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
