import React, { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import UserIcon from '../userIcon/UserIcon';
import SubmenuItem from '../submenuItem/SubmenuItem';
import MenuSpan from '../submenuItem/menuSpan/MenuSpan';
import classes from './header.module.scss';

const Header = () => {
  const [activeItem, setActiveItem] = useState('');
  const isActiveMenu = activeItem === 'work' || activeItem === 'project';

  const [submenu, setSubmenu] = useState('');

  const workMenuHandler = () => {
    const item = 'work';
    setActiveItem(item);
    setSubmenu(item);
    if (activeItem === item) {
      setActiveItem('');
    }
  };

  const projectMenuHandler = () => {
    const item = 'project';
    setActiveItem(item);
    setSubmenu(item);
    if (activeItem === item) {
      setActiveItem('');
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.header_inner}>
        <div className={classes.header_logo}></div>
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
              {activeItem === 'work' && <SubmenuItem menuItem={submenu}></SubmenuItem>}
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
              {activeItem === 'project' && <SubmenuItem menuItem={submenu}></SubmenuItem>}
            </li>
          </ul>
        </nav>
        <button className={classes.header_createBtn}>Create</button>
        <UserIcon user="OD"></UserIcon>
      </div>
    </header>
  );
};

export default Header;
