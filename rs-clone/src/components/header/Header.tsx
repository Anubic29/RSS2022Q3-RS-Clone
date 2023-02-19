import React, { useEffect, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import UserIcon from '../userIcon/UserIcon';
import SubmenuItem from '../submenuItem/SubmenuItem';
import MenuSpan from '../submenuItem/menuSpan/MenuSpan';
import classes from './header.module.scss';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import useComponentVisible from '../../hooks/useComponentVisible/useAllComponentsVisible';

const Header = () => {
  const [activeItem, setActiveItem] = useState('');
  const [submenu, setSubmenu] = useState('');

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
    if (activeItem === item) {
      setActiveItem('');
    }
  };

  useEffect(() => {
    console.log(isWorkMenuVisible);
  }, [isWorkMenuVisible]);

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
    const item = 'userMenu';
    setActiveItem(item);
    setSubmenu(item);
    setUserIsMenuVisible(true);
    if (activeItem === item) {
      setActiveItem('');
      setUserIsMenuVisible(false);
    }
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
                  <SubmenuItem menuItem={submenu}></SubmenuItem>
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
                  <SubmenuItem menuItem={submenu}></SubmenuItem>
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
            <UserIcon user="OD"></UserIcon>
          </div>
          {activeItem === 'userMenu' && isUserMenuVisible && (
            <div className={classes.absolute + ' ' + classes.submenu_box_right} ref={userRef}>
              <SubmenuItem menuItem={submenu}></SubmenuItem>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
