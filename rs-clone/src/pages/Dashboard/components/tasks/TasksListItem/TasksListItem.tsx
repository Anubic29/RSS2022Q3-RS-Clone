import { MdCheckBox } from 'react-icons/md';

import Styles from './TasksListItem.module.scss';

function TasksListItem() {
  return (
    <li className={Styles.TaskItem}>
      <MdCheckBox className={Styles.TaskIcon} />
      <div className={Styles.Content}>
        <div className={Styles.TitleArea}>
          <div className={Styles.TaskTitle}>Checkout popup</div>
          <div className={Styles.ProjectInfo}>
            <span>CBC-3</span>
            <span className={Styles.Separator}></span>
            <span>Company BD Code</span>
          </div>
        </div>
        <p className={Styles.ProjectColumn}>IN DEV</p>
      </div>
      <div className={Styles.Empty}></div>
    </li>
  );
}

export default TasksListItem;
