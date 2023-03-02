import React, { useState } from 'react';
import SubmenuItemsSortedBlock from './components/SubmenuItamsBlock/SubmenuItemSortedBlock';
import BoxWithShadow from '../BoxWithShadow/BoxWithShadow';
import SubmenuNav from './components/SubmenuNav/SubmenuNav';

const SubmenuItem: React.FC<{ menuItem: 'work' | 'project' }> = (props) => {
  const [tab, setTab] = useState('assigned');
  const saveTabValueHandler = (tabValue: string) => {
    setTab(tabValue);
    return tabValue;
  };

  return (
    <BoxWithShadow>
      {props.menuItem === 'work' && (
        <>
          <SubmenuNav onNavTabHandler={saveTabValueHandler} menuItem={props.menuItem} />
          <SubmenuItemsSortedBlock />
        </>
      )}
    </BoxWithShadow>
  );
};

export default SubmenuItem;
