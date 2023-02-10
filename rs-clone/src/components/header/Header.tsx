import React, { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import UserIcon from '../userIcon/UserIcon';
import SubmenuItem from '../submenuItem/SubmenuItem';
import MenuSpan from '../submenuItem/menuSpan/MenuSpan';
import classes from './header.module.scss';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [activeItem, setActiveItem] = useState('');
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

  const userIconHandler = () => {
    const item = 'userMenu';
    setActiveItem(item);
    setSubmenu(item);
    if (activeItem === item) {
      setActiveItem('');
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
        <Button className={classes.header_createBtn}>Create</Button>
        <div className={classes.header_userMenu}>
          <div onClick={userIconHandler}>
            <UserIcon user="OD"></UserIcon>
          </div>
          {activeItem === 'userMenu' && <SubmenuItem menuItem={submenu}></SubmenuItem>}
        </div>
      </div>
    </header>
  );
};

export default Header;
