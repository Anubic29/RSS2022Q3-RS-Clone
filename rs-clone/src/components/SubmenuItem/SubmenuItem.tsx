import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmenuItemsBlock from './components/SubmenuItamsBlock/SubmenuItemsBlock';
import SubmenuItemsSortedBlock from './components/SubmenuItamsBlock/SubmenuItemSortedBlock';
import { Link } from 'react-router-dom';
import classes from './SubmenuItem.module.scss';
import { IsAuthContex } from '../../contexs';
import BoxWithShadow from '../BoxWithShadow/BoxWithShadow';
import SubmenuNav from './components/SubmenuNav/SubmenuNav';

const SubmenuItem: React.FC<{ menuItem: 'work' | 'userMenu' | 'project' }> = (props) => {
  const contextValue = useContext(IsAuthContex);
  const [tab, setTab] = useState('assigned');
  const saveTabValueHandler = (tabValue: string) => {
    setTab(tabValue);
    return tabValue;
  };

  const navigate = useNavigate();

  const logOutHandler = () => {
    contextValue.setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const link = () => {
    switch (props.menuItem) {
      case 'userMenu':
        return (
          <div onMouseDown={logOutHandler}>
            <p>Log out</p>
          </div>
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
    <BoxWithShadow>
      {props.menuItem === 'work' && (
        <>
          <SubmenuNav onNavTabHandler={saveTabValueHandler} menuItem={props.menuItem} />
          <SubmenuItemsSortedBlock onTabChange={tab} menuItem={props.menuItem} />
        </>
      )}
      {props.menuItem !== 'work' && (
        <SubmenuItemsBlock onTabChange={tab} menuItem={props.menuItem} />
      )}
      <nav className={classes.submenuBottomNav}>{link()}</nav>
    </BoxWithShadow>
  );
};

export default SubmenuItem;
