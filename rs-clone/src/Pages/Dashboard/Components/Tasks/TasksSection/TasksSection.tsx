import { TasksList } from '../..';

import Styles from './TasksSection.module.scss';

function TasksSection() {
  return (
    <section className={Styles.Tasks}>
      <ul className={Styles.Tabs}>
        <li className={Styles.TabsItem}>Your tasks</li>
        <li className={Styles.TabsItem}>Marked</li>
      </ul>
      <div className={Styles.Content}>
        <TasksList />
      </div>
    </section>
  );
}

export default TasksSection;
