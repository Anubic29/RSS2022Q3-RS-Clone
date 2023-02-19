import React, { useCallback, useState } from 'react';
import { MdKeyboardArrowLeft as IconLeft, MdKeyboardArrowRight as IconRight } from 'react-icons/md';
import { ProjectAvatar } from '../../../../components';
import { AsideNavElement } from '../';
import { useLocation } from 'react-router-dom';
import { useBoard } from '../../../../contexts/Board.context';

import styles from './AsideBar.module.scss';

interface AsideBarProps {
  onChangeAsideState: (state: boolean) => void;
}

function AsideBar(props: AsideBarProps) {
  const { projectInfo } = useBoard();
  const currentScreenWidth = window.screen.width;
  const location = useLocation();
  const currentPath = location.pathname.split('/').at(-1);
  const [isActive, setIsActive] = useState({
    board: currentPath !== 'settings',
    settings: currentPath === 'settings'
  });
  const [isCollapsed, setIsCollapsed] = useState(currentScreenWidth <= 767);

  const changeActiveStateHandler = (event: React.MouseEvent<HTMLElement>) => {
    const target = (event.target as HTMLElement).closest('a') as HTMLElement;

    if (target.id === 'board') {
      setIsActive({ board: true, settings: false });
    }

    if (target.id === 'settings') {
      setIsActive({ board: false, settings: true });
    }
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
        <ProjectAvatar
          source={projectInfo?.pathImage ?? ''}
          bgColor={projectInfo?.color ?? 'transparent'}
          size={23}
        />

        <div className={styles.ProjectInfo}>
          <p className={styles.ProjectTitle}>{projectInfo?.title}</p>
          <p className={styles.ProjectDescription}>{projectInfo?.description}</p>
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
