import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdKeyboardArrowLeft as IconLeft, MdKeyboardArrowRight as IconRight } from 'react-icons/md';
import { ProjectAvatar } from '../../../../components';
import { AsideNavElement } from '../';
import cardsData from '../../../../data/fakeProjectCard';

import styles from './AsideBar.module.scss';

function AsideBar() {
  const currentScreenWidth = window.screen.width;
  const location = useLocation();
  const currentPath = location.pathname.split('/').at(-1);
  const [isActive, setIsActive] = useState({
    board: currentPath !== 'settings',
    settings: currentPath === 'settings'
  });
  const [isCollapsed, setIsCollapsed] = useState(currentScreenWidth <= 767);
  const testProjectData = cardsData[0];

  const changeActiveStateHandler = (event: React.MouseEvent<HTMLElement>) => {
    const target = (event.target as HTMLElement).closest('a') as HTMLElement;

    if (target.id === 'board') {
      setIsActive({ board: true, settings: false });
    }

    if (target.id === 'settings') {
      setIsActive({ board: false, settings: true });
    }
  };

  const collapseHandler = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={isCollapsed ? styles.AsideBarCollapsed : styles.AsideBar}>
      <div className={styles.CollapseButton} onClick={collapseHandler}>
        {isCollapsed ? <IconRight /> : <IconLeft />}
      </div>

      <div className={styles.TitleArea}>
        <ProjectAvatar {...testProjectData} />

        <div className={styles.ProjectInfo}>
          <p className={styles.ProjectTitle}>{testProjectData.title}</p>
          <p className={styles.ProjectDescription}>{testProjectData.description}</p>
        </div>
      </div>

      <nav className={styles.Navigation}>
        <p className={styles.NavTitle}>Project</p>

        <ul>
          <AsideNavElement
            title="Board"
            id="board"
            isActive={isActive.board}
            link="board"
            onClick={changeActiveStateHandler}
          />
          <AsideNavElement
            title="Settings"
            id="settings"
            isActive={isActive.settings}
            link="settings"
            onClick={changeActiveStateHandler}
          />
        </ul>
      </nav>
    </aside>
  );
}

export default AsideBar;
