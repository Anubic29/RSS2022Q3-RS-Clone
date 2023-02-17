import { MdOutlineViewColumn as BoardIcon } from 'react-icons/md';
import { MdCheckBox as TaskIcon } from 'react-icons/md';
import { MdOutlineStar as StarIcon } from 'react-icons/md';
import Styles from './MarkedItem.module.scss';

interface MarkedItemProps {
  type: 'Task' | 'Board';
  title: string;
  depProject: string;
}

const ICONS_MAP = {
  Task: <TaskIcon className={Styles.TypeIcon} />,
  Board: <BoardIcon className={Styles.TypeIcon} />
};

function MarkedItem(props: MarkedItemProps) {
  const { type, title, depProject } = props;

  return (
    <li className={Styles.TaskItem}>
      <div className={Styles.IconsContainer}>
        <StarIcon className={Styles.StarIcon} title="Remove from marked" />
        {ICONS_MAP[type]}
      </div>
      <div className={Styles.Content}>
        <div className={Styles.TitleArea}>
          <div className={Styles.Title}>{title}</div>
          <div className={Styles.Info}>
            <span>{type}</span>
            <span className={Styles.Separator}></span>
            <span>in {depProject}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MarkedItem;
