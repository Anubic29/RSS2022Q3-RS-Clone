import React, { useState } from 'react';
import { MarkedItemsList, TasksList } from '../..';

import styles from './TasksSection.module.scss';

const tabsIds: Record<string, string> = {
  tasks: 'tabs-tasks',
  marked: 'tabs-marked'
};

function TasksSection() {
  const [currentTab, setCurrentTab] = useState(tabsIds.tasks);
  const [activeTab, setActiveTab] = useState(tabsIds.tasks);

  const changeTabHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    const { id } = event.target as HTMLLIElement;

    setCurrentTab(tabsIds[id]);
    setActiveTab(tabsIds[id]);
  };

  return (
    <section className={styles.Tasks}>
      <ul className={styles.Tabs}>
        <li
          className={styles.TabsItem}
          id="tasks"
          onClick={changeTabHandler}
          data-is-active={activeTab === tabsIds.tasks}>
          Your tasks
        </li>

        <li
          className={styles.TabsItem}
          id="marked"
          onClick={changeTabHandler}
          data-is-active={activeTab === tabsIds.marked}>
          Marked
        </li>
      </ul>

      <div className={styles.Content}>
        {currentTab === tabsIds.tasks ? <TasksList /> : <MarkedItemsList />}
      </div>
    </section>
  );
}

export default TasksSection;
