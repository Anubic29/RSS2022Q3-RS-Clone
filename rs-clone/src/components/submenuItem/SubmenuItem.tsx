import React, { useState, useContext } from 'react';
import BoxWithShadow from '../boxWithShadow/BoxWithShadow';
import SubmenuNav from './submenuNav/SubmenuNaм';
import SubmenuItemsBlock from './submenuItamsBlock/SubmenuItemsBlock';
import { Link } from 'react-router-dom';
import classes from './submenuItem.module.scss';
import { IsAuthContex } from '../../context';

const SubmenuItem: React.FC<{ menuItem: string }> = (props) => {
  const contextValue = useContext(IsAuthContex);
  const [tab, setTab] = useState('assigned');
  const saveTabValueHandler = (tabValue: string) => {
    setTab(tabValue);
    return tabValue;
  };

  const logOutHandler = () => {
    contextValue.setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
  };

  const link = () => {
    switch (props.menuItem) {
      case 'userMenu':
        return (
          <Link to="/">
            <p onClick={logOutHandler}>Log out</p>
          </Link>
        );
      case 'project':
        return (
          <Link to="/projects">
            <p>View all projects</p>
          </Link>
        );
      case 'work':
        return (
          <Link to="/">
            <p>Go to Work Page</p>
          </Link>
        );
    }
  };

  return (
    <div
      className={
        classes.submenu_box + ' ' + (props.menuItem === 'userMenu' ? classes.submenu_box_right : '')
      }>
      <BoxWithShadow>
        <SubmenuNav onNavTabHandler={saveTabValueHandler} menuItem={props.menuItem} />
        <SubmenuItemsBlock onTabChange={tab} menuItem={props.menuItem} />
        <nav className={classes.submenuBottomNav}>{link()}</nav>
      </BoxWithShadow>
    </div>
  );
};

export default SubmenuItem;
