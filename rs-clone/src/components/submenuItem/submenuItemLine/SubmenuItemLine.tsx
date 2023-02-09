import React from 'react';
import { Link } from 'react-router-dom';
import classes from './submenuItemLine.module.scss';

const SubmenuItemLine: React.FC<{
  title: string;
  src: string;
  article: string;
  project: string;
  bgColor: string;
}> = (props) => {
  return (
    <li>
      <Link to="/" className={classes.submenu_line}>
        <div
          className={classes.submenu_imgWrap}
          style={{
            backgroundColor: `${props.bgColor}`,
            backgroundImage: `url(${props.src})`
          }}></div>
        <div className={classes.submenu_texts}>
          <p className={classes.submenu_itemTitles}>{props.title}</p>
          <div className={classes.submenu_itemDetails}>
            <span className={classes.itemDetails}>{props.article}</span>
            <span className={classes.itemDetails}>{props.project}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SubmenuItemLine;