import {
  MdOutlineViewColumn as BoardIcon,
  MdCheckBox as TaskIcon,
  MdOutlineStar as StarIcon
} from 'react-icons/md';

import styles from './MarkedItem.module.scss';

interface MarkedItemProps {
  type: 'Task' | 'Board';
  title: string;
  depProject: string;
}

const ICONS_MAP = {
  Task: <TaskIcon className={styles.TypeIcon} />,
  Board: <BoardIcon className={styles.TypeIcon} />
};

function MarkedItem(props: MarkedItemProps) {
  const { type, title, depProject } = props;

  return (
    <li className={styles.TaskItem}>
      <div className={styles.IconsContainer}>
        <StarIcon className={styles.StarIcon} title="Remove from marked" />
        {ICONS_MAP[type]}
      </div>

      <div className={styles.Content}>
        <div className={styles.TitleArea}>
          <div className={styles.Title}>{title}</div>

          <div className={styles.Info}>
            <span>{type}</span>
            <span className={styles.Separator}></span>
            <span>in {depProject}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MarkedItem;
