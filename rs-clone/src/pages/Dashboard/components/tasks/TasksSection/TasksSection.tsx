import React, { useState } from 'react';
import { MarkedItemsList, TasksList } from '../..';

import styles from './TasksSection.module.scss';

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
    <section className={styles.Tasks}>
      <ul className={styles.Tabs}>
        <li
          className={styles.TabsItem}
          id={TabsIds.TASKS}
          onClick={changeViewHandler}
          data-is-active={isActive.tasks}>
          Your tasks
        </li>

        <li
          className={styles.TabsItem}
          id={TabsIds.MARKED}
          onClick={changeViewHandler}
          data-is-active={isActive.marked}>
          Marked
        </li>
      </ul>

      <div className={styles.Content}>{view}</div>
    </section>
  );
}

export default TasksSection;
