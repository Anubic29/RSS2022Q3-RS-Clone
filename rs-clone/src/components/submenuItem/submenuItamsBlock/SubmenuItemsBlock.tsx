import React from 'react';
import SubmenuItemLine from '../submenuItemLine/SubmenuItemLine';

const bd = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    title: 'Header & Footer',
    article: 'CBC - 3',
    project: 'BDCS',
    bgColor: '#4cade8'
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    title: 'Tooth ter',
    article: 'CBC44',
    project: 'faS',
    bgColor: '#4cade8'
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    title: 'Nase & Footer',
    article: 'CBC66',
    project: 'BDafaffaCS',
    bgColor: '#4cade8'
  }
];

const bd2 = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    title: 'Доска CBC',
    article: 'in',
    project: 'Company BDSM',
    bgColor: '#4cade8'
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    title: 'Доска PER',
    article: 'in',
    project: 'Lena&&Alex',
    bgColor: '#4cade8'
  }
];

const projects = [
  {
    id: 1,
    title: 'Project',
    description: 'Drscription',
    article: '',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#FF0000',
    project: 'Software project'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Drscription 2',
    article: '',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#00FF00',
    project: 'Software project'
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Drscription 3',
    article: '',
    size: 23,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#0000FF',
    project: 'Software project'
  },
  {
    id: 4,
    title: 'Project 4',
    description: 'Drscription 4',
    article: '',
    size: 23,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#FF00FF',
    project: 'Software project'
  },
  {
    id: 5,
    title: 'Project 5',
    description: 'Drscription 5',
    article: '',
    size: 23,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#00FFFF',
    project: 'Software project'
  },
  {
    id: 6,
    title: 'Project 6',
    description: 'Drscription 6',
    article: '',
    size: 23,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#00FF00',
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
            src={item.src}
            bgColor={item.bgColor ? item.bgColor : ''}></SubmenuItemLine>
        ))}
      </ul>
    </div>
  );
};

export default SubmenuItemsBlock;
