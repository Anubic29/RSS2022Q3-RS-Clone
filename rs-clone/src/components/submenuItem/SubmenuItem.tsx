import React, { useState } from 'react';
import BoxWithShadow from '../boxWithShadow/BoxWithShadow';
import SubmenuNav from './submenuNav/SubmenuNav';
import SubmenuItemsBlock from './submenuItamsBlock/SubmenuItemsBlock';
import { Link } from 'react-router-dom';
import classes from './submenuItem.module.scss';

const SubmenuItem: React.FC<{ menuItem: string }> = (props) => {
  const [tab, setTab] = useState('assigned');
  const saveTabValueHandler = (tabValue: string) => {
    setTab(tabValue);
    return tabValue;
  };

  return (
    <div className={classes.submenu_box}>
      <BoxWithShadow>
        <SubmenuNav onNavTabHandler={saveTabValueHandler} menuItem={props.menuItem} />
        <SubmenuItemsBlock onTabChange={tab} menuItem={props.menuItem} />
        <nav className={classes.submenuBottomNav}>
          <p>
            <Link to="/">View all projects</Link>
          </p>
        </nav>
      </BoxWithShadow>
    </div>
  );
};

export default SubmenuItem;
