import React, { useCallback, useEffect, useState } from 'react';
import { MdKeyboardArrowLeft as IconLeft, MdKeyboardArrowRight as IconRight } from 'react-icons/md';
import { ProjectAvatar } from '../../../../components';
import { AsideNavElement } from '../';
import { useBoard } from '../../../../contexts';
import { useLocation } from 'react-router-dom';
import ProjectType from '../../../../types/project/projectType';

import styles from './AsideBar.module.scss';

const MEDIA_TABLET = 767;
const BADGE_SIZE = 24;

interface AsideBarProps {
  onChangeAsideState: (state: boolean) => void;
}

function AsideBar(props: AsideBarProps) {
  const { projectInfo } = useBoard();
  const { title, description, pathImage, color } = projectInfo as ProjectType;
  const currentScreenWidth = window.screen.width;
  const location = useLocation();
  const currentPath = location.pathname.split('/').at(-1);
  const [activeLayout, setActiveLayout] = useState({
    board: currentPath !== 'settings' && currentPath !== 'team',
    settings: currentPath === 'settings',
    team: currentPath === 'team'
  });
  const [isCollapsed, setIsCollapsed] = useState(currentScreenWidth <= MEDIA_TABLET);

  useEffect(() => {
    if (currentPath === 'settings') {
      setActiveLayout({ board: false, settings: true, team: false });
    } else if (currentPath === 'team') {
      setActiveLayout({ board: false, settings: false, team: true });
    } else {
      setActiveLayout({ board: true, settings: false, team: false });
    }
  }, [currentPath]);

  const changeActiveStateHandler = (event: React.MouseEvent) => {
    const target = (event.target as HTMLElement).closest('a') as HTMLElement;

    setActiveLayout({ board: false, settings: false, team: false, [target.id]: true });
  };

  const collapseHandler = useCallback(() => {
    setIsCollapsed(!isCollapsed);
    props.onChangeAsideState(!isCollapsed);
  }, [isCollapsed, props.onChangeAsideState]);

  return (
    <aside className={isCollapsed ? styles.AsideBarCollapsed : styles.AsideBar}>
      <div className={styles.CollapseButton} onClick={collapseHandler}>
        {isCollapsed ? <IconRight /> : <IconLeft />}
      </div>

      <div className={styles.TitleArea}>
        <ProjectAvatar source={pathImage} size={BADGE_SIZE} bgColor={color} />

        <div className={styles.ProjectInfo}>
          <p className={styles.ProjectTitle}>{title}</p>
          <p className={styles.ProjectDescription}>{description}</p>
        </div>
      </div>

      <nav className={styles.Navigation}>
        <p className={styles.NavTitle}>Project</p>

        <ul>
          <AsideNavElement
            title="Board"
            id="board"
            isActive={activeLayout.board}
            link="board"
            onClick={changeActiveStateHandler}
          />
          <AsideNavElement
            title="Team"
            id="team"
            isActive={activeLayout.team}
            link="team"
            onClick={changeActiveStateHandler}
          />
          <AsideNavElement
            title="Settings"
            id="settings"
            isActive={activeLayout.settings}
            link="settings"
            onClick={changeActiveStateHandler}
          />
        </ul>
      </nav>
    </aside>
  );
}

export default AsideBar;
