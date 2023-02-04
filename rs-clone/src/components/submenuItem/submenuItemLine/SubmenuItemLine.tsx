import { url } from 'inspector';
import React from 'react';
import blue from './blue-check.svg';
// import classes from './submenuItemLine.scss';

const SubmenuItemLine: React.FC<{
  title: string;
  src: string;
  article: string;
  project: string;
}> = (props) => {
  return (
    <li className="submenu_line">
      <div className="submenu_img-wrap"></div>
      <div className="submenu_texts">
        <p className="submenu_item-title">{props.title}</p>
        <div className="submenu_item-details">
          <span className="item-details">{props.article}</span>
          <span className="item-details">{props.project}</span>
        </div>
      </div>
    </li>
  );
};

export default SubmenuItemLine;
