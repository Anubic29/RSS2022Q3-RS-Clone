import React from 'react';
import SubmenuItemLine from '../SubmenuItemLine/SubmenuItemLine';
import classes from '../../SubmenuItem.module.scss';

type blockType = {
  subtitle: string;
  base: {
    src: string;
    title: string;
    article: string;
    project: string;
    bgColor: string;
  }[];
};

const bd = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    title: 'Header & Footer',
    article: 'CBC3',
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
    article: '',
    project: 'Company BDSM',
    bgColor: '#4cade8'
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    title: 'Доска PER',
    article: '',
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
    title: 'project 2',
    description: 'Drscription 2',
    article: '',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#00FF00',
    project: 'Software project'
  },
  {
    id: 3,
    title: 'project 3',
    description: 'Drscription 3',
    article: '',
    size: 23,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#0000FF',
    project: 'Software project'
  },
  {
    id: 4,
    title: 'project 4',
    description: 'Drscription 4',
    article: '',
    size: 23,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#FF00FF',
    project: 'Software project'
  },
  {
    id: 5,
    title: 'project 5',
    description: 'Drscription 5',
    article: '',
    size: 23,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#00FFFF',
    project: 'Software project'
  },
  {
    id: 6,
    title: 'project 6',
    description: 'Drscription 6',
    article: '',
    size: 23,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#00FF00',
    project: 'Software project'
  }
];

const user = [
  {
    id: 0,
    title: 'Olena Datso',
    article: '',
    src: '',
    bgColor: '#00FF00',
    project: 'email@tt.ua'
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

  const contenUserMenu = {
    subtitle: 'ACCOUNT',
    base: user
  };

  const block = () => {
    switch (menuItem) {
      case 'work':
        return contentWork;
      case 'userMenu':
        return contenUserMenu;
      case 'project':
        return contentProject;
    }
  };

  return (
    <>
      <div className={classes.itemsBlock}>
        <p className={classes.submenu_subtitle}>{(block() as blockType).subtitle}</p>
        <ul className={classes.submenu_itemsList}>
          {(block() as blockType).base.map((item, i) => {
            if (menuItem === 'work' && tab === 'assigned') {
              item.article = item.article + '-';
            }
            return (
              <SubmenuItemLine
                key={i}
                title={item.title}
                article={item.article}
                project={item.project}
                src={item.src}
                bgColor={item.bgColor ? item.bgColor : ''}></SubmenuItemLine>
            );
          })}
        </ul>
      </div>
      {menuItem === 'userMenu' && (
        <div className={classes.itemsBlock + ' ' + classes.itemsBlock__jira}>
          <p className={classes.submenu_subtitle}>JIRA</p>
          <SubmenuItemLine
            key=""
            title=""
            article=""
            project=""
            src=""
            bgColor=""></SubmenuItemLine>
        </div>
      )}
    </>
  );
};

export default SubmenuItemsBlock;
