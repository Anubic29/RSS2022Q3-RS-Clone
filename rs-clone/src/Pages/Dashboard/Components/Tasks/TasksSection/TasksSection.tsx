import { useState } from 'react';
import { TasksList } from '../..';

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
    } else {
      setView(<h1>Marked items list</h1>);
    }

    setIsActive({ tasks: !isActive.tasks, marked: !isActive.marked });
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
