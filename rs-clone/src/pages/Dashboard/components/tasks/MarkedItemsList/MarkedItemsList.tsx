import { EmptyData } from '../../../../../components';
import { MarkedItem } from '../..';
import { useUser } from '../../../../../contexts';

import styles from './MarkedItemsList.module.scss';

function MarkedItemsList() {
  const { notedItemList } = useUser();

  return (
    <>
      {notedItemList.length ? (
        <ul className={styles.MarkedItemsList}>
          {notedItemList.map((item) => {
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
