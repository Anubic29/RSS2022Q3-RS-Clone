import React, { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import UserIcon from '../userIcon/UserIcon';
import SubmenuItem from '../submenuItem/SubmenuItem';
import MenuSpan from '../menuSpan/MenuSpan';

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
    <header className="header">
      <div className="header_inner">
        <div className="header_logo"></div>
        <nav className="header_menu">
          <ul className="header_menu-list">
            <li className="header_menu-item">
              <div
                className={`menu_span-wrap ${activeItem === 'work' && 'active'}`}
                onClick={workMenuHandler}>
                <MenuSpan text="Your work"></MenuSpan>
                <MdExpandMore className="header_menu-arrow" />
              </div>
              {activeItem === 'work' && <SubmenuItem menuItem={submenu}></SubmenuItem>}
            </li>
            <li className="header_menu-item">
              <div
                className={`menu_span-wrap ${activeItem === 'project' && 'active'}`}
                onClick={projectMenuHandler}>
                <MenuSpan text="Projects"></MenuSpan>
                <MdExpandMore className="header_menu-arrow" />
              </div>
              {activeItem === 'project' && <SubmenuItem menuItem={submenu}></SubmenuItem>}
            </li>
          </ul>
        </nav>
        <button className="header_create-btn">Create</button>
        <UserIcon user="OD"></UserIcon>
      </div>
    </header>
  );
};

export default Header;
