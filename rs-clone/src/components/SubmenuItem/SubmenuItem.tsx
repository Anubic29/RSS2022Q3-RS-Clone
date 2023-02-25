import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmenuItemsBlock from './components/SubmenuItamsBlock/SubmenuItemsBlock';
import { Link } from 'react-router-dom';
import classes from './SubmenuItem.module.scss';
import BoxWithShadow from '../BoxWithShadow/BoxWithShadow';
import SubmenuNav from './components/SubmenuNav/SubmenuNav';
import { useAuth } from '../../contexts';

const SubmenuItem: React.FC<{ menuItem: string }> = (props) => {
  const { removeTokenData } = useAuth();
  const [tab, setTab] = useState('assigned');
  const saveTabValueHandler = (tabValue: string) => {
    setTab(tabValue);
    return tabValue;
  };

  const navigate = useNavigate();

  const logOutHandler = () => {
    removeTokenData();
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
      <SubmenuNav onNavTabHandler={saveTabValueHandler} menuItem={props.menuItem} />
      <SubmenuItemsBlock onTabChange={tab} menuItem={props.menuItem} />
      <nav className={classes.submenuBottomNav}>{link()}</nav>
    </BoxWithShadow>
  );
};

export default SubmenuItem;
