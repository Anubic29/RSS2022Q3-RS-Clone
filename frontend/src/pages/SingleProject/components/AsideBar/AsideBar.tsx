import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { sizesData } from '../../../../data';
import { ProjectAvatar } from '../../../../components';
import { AsideNavElement } from '../';

import {
  MdKeyboardArrowLeft as IconLeft,
  MdKeyboardArrowRight as IconRight,
  MdOutlineViewColumn as BoardIcon,
  MdSettings as SettingsIcon,
  MdSupervisorAccount as TeamIcon
} from 'react-icons/md';

import styles from './AsideBar.module.scss';

const { WIDTH_MEDIA_TABLET } = sizesData;

function AsideBar() {
  const currentProject = useSelector((state: RootState) => state.projectSlice.project);
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(window.screen.width <= WIDTH_MEDIA_TABLET);

  const className = useMemo(() => {
    let str = styles['aside-bar'];
    if (isCollapsed) str += ` ${styles['collapsed']}`;
    return str;
  }, [isCollapsed]);

  const currentPath = useMemo(() => location.pathname.split('/').at(-1), [location.pathname]);

  const navLinks = useMemo(
    () => [
      {
        icon: BoardIcon,
        title: 'Board',
        link: 'board'
      },
      {
        icon: TeamIcon,
        title: 'Team',
        link: 'team'
      },
      {
        icon: SettingsIcon,
        title: 'Settings',
        link: 'settings'
      }
    ],
    []
  );

  return (
    <aside className={className}>
      <div className={styles['button']} onClick={() => setIsCollapsed((prev) => !prev)}>
        {isCollapsed ? <IconRight /> : <IconLeft />}
      </div>

      <div className={styles['project']}>
        <ProjectAvatar source={`${currentProject?.pathImage}`} typeSize="small" />

        <div className={styles['info']}>
          <p className={styles['title']}>{currentProject?.title}</p>
          <p className={styles['description']}>{currentProject?.description}</p>
        </div>
      </div>

      <nav className={styles['navigation']}>
        <p className={styles['nav-title']}>Project</p>

        <ul>
          {navLinks.map((navLink, idx) => (
            <li key={`aside-link-${idx}`}>
              <AsideNavElement isActive={currentPath === navLink.link} {...navLink} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default AsideBar;
