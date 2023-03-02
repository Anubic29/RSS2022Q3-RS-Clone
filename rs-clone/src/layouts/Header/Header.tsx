import React, { useEffect, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

import { UserIcon, SubmenuItem, Button } from '../../components';
import MenuSpan from '../../components/SubmenuItem/components/MenuSpan/MenuSpan';
import classes from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import useComponentVisible from '../../hooks/useComponentVisible/useComponentVisible';
import { useUser } from '../../contexts';
import { useTasks } from '../../contexts/TasksContext';
import ProfileMenu from '../../components/SubmenuItem/components/ProfileMenu/ProfileMenu';
import RecentProjects from '../../components/SubmenuItem/components/RecentProjects/RecentProjects';
import AssignedTasks from '../../components/SubmenuItem/components/AssignedTasks/AssignedTasks';

const Header = () => {
  const [activeItem, setActiveItem] = useState('');
  const [submenu, setSubmenu] = useState<'work' | 'project'>('work');

  const { currentUser } = useUser();
  const { getTasks } = useTasks();
  useEffect(() => {
    (async () => {
      await getTasks();
    })();
  }, []);

  const navigate = useNavigate();

  const {
    ref: workRef,
    isComponentVisible: isWorkMenuVisible,
    setIsComponentVisible: setWorkIsMenuVisible
  } = useComponentVisible(false);

  const {
    ref: projRef,
    isComponentVisible: isProjMenuVisible,
    setIsComponentVisible: setProjIsMenuVisible
  } = useComponentVisible(false);

  const {
    ref: userRef,
    isComponentVisible: isUserMenuVisible,
    setIsComponentVisible: setUserIsMenuVisible
  } = useComponentVisible(false);

  const workMenuHandler = () => {
    const item = 'work';
    setActiveItem(item);
    setSubmenu(item);
    setWorkIsMenuVisible(true);
    if (activeItem === item) {
      setActiveItem('');
      setWorkIsMenuVisible(false);
    }
  };

  useEffect(() => {
    if (!isWorkMenuVisible && !isProjMenuVisible && !isUserMenuVisible) setActiveItem('');
  }, [isWorkMenuVisible, isProjMenuVisible, isUserMenuVisible]);

  const projectMenuHandler = () => {
    const item = 'project';
    setActiveItem(item);
    setSubmenu(item);
    setProjIsMenuVisible(true);
    if (activeItem === item) {
      setActiveItem('');
      setProjIsMenuVisible(false);
    }
  };

  const userIconHandler = () => {
    setActiveItem('userMenu');
    setUserIsMenuVisible(true);
    if (activeItem === 'userMenu') {
      setActiveItem('');
      setUserIsMenuVisible(false);
    }
  };

  const onUserMenuVisibleHandler = () => {
    setActiveItem('');
    setUserIsMenuVisible(false);
  };

  const onRecentVisibleHandler = () => {
    setActiveItem('');
    setProjIsMenuVisible(false);
  };

  const onTasksVisibleHandler = () => {
    setActiveItem('');
    setWorkIsMenuVisible(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header_inner}>
        <Link className={classes.header_logo} to="/" />
        <nav className={classes.header_menu}>
          <ul className={classes.header_menuList}>
            <li className={classes.header_menuItem}>
              <div
                className={`${classes.menu_spanWrap} ${
                  activeItem === classes.work && classes.active
                }`}
                onClick={workMenuHandler}>
                <MenuSpan text="Your work"></MenuSpan>
                <MdExpandMore className={classes.header_menuArrow} />
              </div>
              {activeItem === 'work' && (
                <div className={classes.absolute} ref={workRef}>
                  <AssignedTasks onVisHandler={onTasksVisibleHandler}></AssignedTasks>
                </div>
              )}
            </li>
            <li className={classes.header_menuItem}>
              <div
                className={`${classes.menu_spanWrap} ${
                  activeItem === classes.project && classes.active
                }`}
                onClick={projectMenuHandler}>
                <MenuSpan text="Projects"></MenuSpan>
                <MdExpandMore className={classes.header_menuArrow} />
              </div>
              {activeItem === 'project' && isProjMenuVisible && (
                <div className={classes.absolute} ref={projRef}>
                  <RecentProjects onVisHandler={onRecentVisibleHandler}></RecentProjects>
                </div>
              )}
            </li>
          </ul>
        </nav>
        <Button onClick={() => navigate('/create-project')} className={classes.header_createBtn}>
          Create
        </Button>
        <div className={classes.header_userMenu}>
          <div onClick={userIconHandler}>
            <UserIcon
              userFrst={(currentUser?.firstName[0] as string) || '0'}
              userLast={(currentUser?.lastName[0] as string) || '0'}></UserIcon>
          </div>
          {activeItem === 'userMenu' && isUserMenuVisible && (
            <div className={classes.absolute + ' ' + classes.submenu_box_right} ref={userRef}>
              <ProfileMenu onVisibleHandler={onUserMenuVisibleHandler} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
