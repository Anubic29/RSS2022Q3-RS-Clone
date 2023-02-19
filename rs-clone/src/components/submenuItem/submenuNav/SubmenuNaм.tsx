import React, { useEffect, useState } from 'react';
import MenuSpan from '../menuSpan/MenuSpan';
import classes from './submenuNav.module.scss';

const SubmenuNav: React.FC<{ onNavTabHandler: (tabValue: string) => string; menuItem: string }> = (
  props
) => {
  const [tab, setTab] = useState('assigned');

  const asignClickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setTab('assigned');
  };

  const boardClickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
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
            onClick={(e) => asignClickHandler(e)}>
            <MenuSpan text="Assigned to me"></MenuSpan>
          </li>
          <li
            className={`${classes.submenuLi} ${assignedChosen || classes.active}`}
            onClick={(e) => boardClickHandler(e)}>
            <MenuSpan text="Boards"></MenuSpan>
          </li>
        </ul>
      )}
    </>
  );
};

export default SubmenuNav;
