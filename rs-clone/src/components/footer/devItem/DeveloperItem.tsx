import React from 'react';
import { AiFillGithub } from 'react-icons/ai';

const DeveloperItem: React.FC<{ dev: string; href: string }> = (props) => {
  return (
    <div>
      <a className="footer_devs-item" href={props.href} target="_blank" rel="noreferrer">
        <AiFillGithub className="git-icon" />
        <p className="dev-name">{props.dev}</p>
      </a>
    </div>
  );
};

export default DeveloperItem;
