import React, { useCallback, useState } from 'react';
import { MdKeyboardArrowLeft as IconLeft, MdKeyboardArrowRight as IconRight } from 'react-icons/md';
import { ProjectAvatar } from '../../../../Components';
import { AsideNavElement } from '../';
import { useLocation } from 'react-router-dom';
import { useBoard } from '../../../../contexts/Board.context';

import Styles from './AsideBar.module.scss';

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

    if (target.id === 'aside-board') {
      setIsActive({ board: true, settings: false });
    }

    if (target.id === 'aside-settings') {
      setIsActive({ board: false, settings: true });
    }
  };

  const collapseHandler = useCallback(() => {
    setIsCollapsed(!isCollapsed);
    props.onChangeAsideState(!isCollapsed);
  }, [isCollapsed, props.onChangeAsideState]);

  return (
    <aside className={isCollapsed ? Styles.AsideBarCollapsed : Styles.AsideBar}>
      <div className={Styles.CollapseButton} onClick={collapseHandler}>
        {isCollapsed ? <IconRight /> : <IconLeft />}
      </div>

      <div className={Styles.TitleArea}>
        <ProjectAvatar
          source={projectInfo?.pathImage ?? ''}
          bgColor={projectInfo?.color ?? 'transparent'}
          size={23}
        />

        <div className={Styles.ProjectInfo}>
          <p className={Styles.ProjectTitle}>{projectInfo?.title}</p>
          <p className={Styles.ProjectDescription}>{projectInfo?.description}</p>
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
