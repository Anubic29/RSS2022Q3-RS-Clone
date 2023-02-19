import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import classes from './DeveloperItem.module.scss';

const DeveloperItem: React.FC<{ dev: string; href: string }> = (props) => {
  return (
    <div>
      <a className={classes.footer_devsItem} href={props.href} target="_blank" rel="noreferrer">
        <AiFillGithub className={classes.gitIcon} />
        <p className={classes.devName}>{props.dev}</p>
      </a>
    </div>
  );
};

export default DeveloperItem;
