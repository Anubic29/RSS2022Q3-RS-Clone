import { useState } from 'react';
import { MarkedItemsList, TasksList } from '../..';

import Styles from './TasksSection.module.scss';

enum TabsIds {
  TASKS = 'tabs-tasks',
  MARKED = 'tabs-marked'
}

function TasksSection() {
  const [view, setView] = useState(<TasksList />);
  const [isActive, setIsActive] = useState({ tasks: true, marked: false });

  const changeViewHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLLIElement;

    if (target.id === TabsIds.TASKS) {
      setView(<TasksList />);
      setIsActive({ tasks: true, marked: false });
    } else {
      setView(<MarkedItemsList />);
      setIsActive({ tasks: false, marked: true });
    }
  };

  return (
    <section className={Styles.Tasks}>
      <ul className={Styles.Tabs}>
        <li
          className={Styles.TabsItem}
          id={TabsIds.TASKS}
          onClick={changeViewHandler}
          data-is-active={isActive.tasks}>
          Your tasks
        </li>
        <li
          className={Styles.TabsItem}
          id={TabsIds.MARKED}
          onClick={changeViewHandler}
          data-is-active={isActive.marked}>
          Marked
        </li>
      </ul>
      <div className={Styles.Content}>{view}</div>
    </section>
  );
}

export default TasksSection;
