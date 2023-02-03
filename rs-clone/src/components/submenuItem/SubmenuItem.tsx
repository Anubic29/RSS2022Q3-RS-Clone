import React, { useState } from 'react';
import BoxWithShadow from '../boxWithShadow/BoxWithShadow';
import SubmenuNav from '../submenuNav/SubmenuNav';
import SubmenuItemsBlock from '../submenuItamsBlock/SubmenuItemsBlock';

const SubmenuItem: React.FC<{ menuItem: string }> = (props) => {
  const [tab, setTab] = useState('assigned');
  const saveTabValueHandler = (tabValue: string) => {
    setTab(tabValue);
    return tabValue;
  };

  return (
    <div className="submenu_box">
      <BoxWithShadow>
        <SubmenuNav onNavTabHandler={saveTabValueHandler} menuItem={props.menuItem} />
        <SubmenuItemsBlock onTabChange={tab} menuItem={props.menuItem} />
        <nav className="submenu-bottom-nav">
          <p>View all projects</p>
        </nav>
      </BoxWithShadow>
    </div>
  );
};

export default SubmenuItem;
