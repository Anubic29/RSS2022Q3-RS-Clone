import React, { useState } from 'react';
import SubmenuItemLine from '../submenuItemLine/SubmenuItemLine';

const bd = [
  {
    src: './blue-check.svg',
    title: 'Header & Footer',
    article: 'CBC - 3',
    project: 'BDCS'
  },
  {
    src: '../../assets/icons/blue-check.svg',
    title: 'Tooth ter',
    article: 'CBC44',
    project: 'faS'
  },
  {
    src: '../../assets/icons/blue-check.svg',
    title: 'Nase & Footer',
    article: 'CBC66',
    project: 'BDafaffaCS'
  }
];

const bd2 = [
  {
    src: './blue-check.svg',
    title: 'Доска CBC',
    article: 'in',
    project: 'Company BDSM'
  },
  {
    src: '../../assets/icons/blue-check.svg',
    title: 'Доска PER',
    article: 'in',
    project: 'Lena&&Alex'
  }
];

const projects = [
  {
    src: './blue-check.svg',
    title: 'Company BDSM Code',
    article: '',
    project: 'Software project'
  },
  {
    src: '../../assets/icons/blue-check.svg',
    title: 'Lena && Alex',
    article: 'in',
    project: 'Software project'
  }
];

const SubmenuItemsBlock: React.FC<{ onTabChange: string; menuItem: string }> = (props) => {
  const menuItem = props.menuItem;
  const tab = props.onTabChange;

  const contentProject = {
    subtitle: 'RECENT',
    base: projects
  };

  const contentWork = {
    subtitle: tab === 'assigned' ? 'DEV READY' : 'RECENT',
    base: tab === 'assigned' ? bd : bd2
  };

  const block = menuItem === 'work' ? contentWork : contentProject;

  return (
    <div className="items-block">
      <p className="submenu_subtitle">{block.subtitle}</p>
      <ul className="submenu_items-list">
        {block.base.map((item, i) => (
          <SubmenuItemLine
            key={i}
            title={item.title}
            article={item.article}
            project={item.project}
            src={item.src}></SubmenuItemLine>
        ))}
      </ul>
    </div>
  );
};

export default SubmenuItemsBlock;
