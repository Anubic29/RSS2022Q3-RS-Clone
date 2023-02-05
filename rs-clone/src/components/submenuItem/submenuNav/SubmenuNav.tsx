import React, { useState } from 'react';
import MenuSpan from '../menuSpan/MenuSpan';
import classes from './submenuNav.module.scss';

const SubmenuNav: React.FC<{ onNavTabHandler: (tabValue: string) => string; menuItem: string }> = (
  props
) => {
  const [tab, setTab] = useState('assigned');

  const asignClickHandler = () => {
    setTab('assigned');
  };

  const boardClickHandler = () => {
    setTab('board');
  };

  const assignedChosen = tab === 'assigned';
  props.onNavTabHandler(tab);

  return (
    <>
      {props.menuItem === 'work' && (
        <ul className={classes.tabsList}>
          <li
            className={`${classes.submenuLi} ${assignedChosen && classes.active}`}
            onClick={asignClickHandler}>
            <MenuSpan text="Assigned to me"></MenuSpan>
          </li>
          <li
            className={`${classes.submenuLi} ${assignedChosen || classes.active}`}
            onClick={boardClickHandler}>
            <MenuSpan text="Boards"></MenuSpan>
          </li>
        </ul>
      )}
    </>
  );
};

export default SubmenuNav;
