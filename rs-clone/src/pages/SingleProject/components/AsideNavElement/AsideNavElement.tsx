import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineViewColumn as BoardIcon,
  MdSettings as SettingsIcon,
  MdSupervisorAccount as TeamIcon
} from 'react-icons/md';

import styles from './AsideNavElement.module.scss';

interface AsideNavElementProps {
  title: string;
  id: 'board' | 'settings' | 'team';
  isActive: boolean;
  link: 'board' | 'settings' | 'team';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const iconsIds = {
  board: <BoardIcon className={styles.Icon} />,
  settings: <SettingsIcon className={styles.Icon} />,
  team: <TeamIcon className={styles.Icon} />
};

function AsideNavElement(props: AsideNavElementProps) {
  const { title, id, isActive, onClick, link } = props;
  const className = isActive ? styles.AsideNavElementActive : styles.AsideNavElement;

  return (
    <Link to={link} onClick={onClick} id={id}>
      <li className={className}>
        {iconsIds[id]}
        <span className={styles.Title}>{title}</span>
      </li>
    </Link>
  );
}

export default AsideNavElement;
