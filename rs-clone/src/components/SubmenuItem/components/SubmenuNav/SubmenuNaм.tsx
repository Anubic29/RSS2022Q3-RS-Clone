import React, { useEffect, useState } from 'react';
import MenuSpan from '../MenuSpan/MenuSpan';
import classes from './SubmenuNav.module.scss';

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
  useEffect(() => {
    props.onNavTabHandler(tab);
  }, [tab]);

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
