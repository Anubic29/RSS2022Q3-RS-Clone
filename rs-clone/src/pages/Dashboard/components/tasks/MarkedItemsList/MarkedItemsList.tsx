import { EmptyData } from '../../../../../components';
import { MarkedItem } from '../..';
import Styles from './MarkedItemsList.module.scss';

function MarkedItemsList() {
  const testCondition = true;

  return (
    <>
      {testCondition ? (
        <ul className={Styles.MarkedItemsList}>
          <MarkedItem type="Task" depProject="Company BDSM Code" title="Task" />
          <MarkedItem type="Board" depProject="Company BDSM Code" title="Board" />
        </ul>
      ) : (
        <div className={Styles.Empty}>
          <EmptyData text="There are no marked items" />
        </div>
      )}
    </>
  );
}

export default MarkedItemsList;
