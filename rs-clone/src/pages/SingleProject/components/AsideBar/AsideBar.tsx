import React, { useState } from 'react';
import { MdKeyboardArrowLeft as IconLeft, MdKeyboardArrowRight as IconRight } from 'react-icons/md';
import { ProjectAvatar } from '../../../../components';
import { AsideNavElement } from '../';
import cardsData from '../../../../data/fakeProjectCard';
import Styles from './AsideBar.module.scss';
import { useLocation } from 'react-router-dom';

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

    if (target.id === 'aside-board') {
      setIsActive({ board: true, settings: false });
    }

    if (target.id === 'aside-settings') {
      setIsActive({ board: false, settings: true });
    }
  };

  const collapseHandler = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={isCollapsed ? Styles.AsideBarCollapsed : Styles.AsideBar}>
      <div className={Styles.CollapseButton} onClick={collapseHandler}>
        {isCollapsed ? <IconRight /> : <IconLeft />}
      </div>

      <div className={Styles.TitleArea}>
        <ProjectAvatar {...testProjectData} />

        <div className={Styles.ProjectInfo}>
          <p className={Styles.ProjectTitle}>{testProjectData.title}</p>
          <p className={Styles.ProjectDescription}>{testProjectData.description}</p>
        </div>
      </div>

      <nav className={Styles.Navigation}>
        <p className={Styles.NavTitle}>Project</p>

        <ul>
          <AsideNavElement
            title="Board"
            id="aside-board"
            isActive={isActive.board}
            link="board"
            onClick={changeActiveStateHandler}
          />
          <AsideNavElement
            title="Settings"
            id="aside-settings"
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
