import React, { useEffect, useState } from 'react';
import SubmenuItemLine from '../SubmenuItemLine/SubmenuItemLine';
import classes from '../../SubmenuItem.module.scss';
import { useUser } from '../../../../contexts';
import { useProjects } from '../../../../contexts';
import { convertLetterToHex } from '../../../../utils/convertLetterToHex';

type blockType = {
  subtitle: string;
  base: {
    [x: string]: string;
    src: string;
    title: string;
    article: string;
    project: string;
    bgColor: string;
  }[];
};

const SubmenuItemsBlock: React.FC<{
  onTabChange: string;
  menuItem: 'work' | 'userMenu' | 'project';
}> = (props) => {
  const menuItem = props.menuItem;
  const { currentUser } = useUser();
  const { projects } = useProjects();

  const [currentProjects] = useState(projects || []);

  const contentProject = {
    subtitle: 'RECENT',
    base: currentProjects
  };

  const userColor = `#${convertLetterToHex(
    currentUser?.firstName[0] as string,
    3,
    '9'
  )}${convertLetterToHex(currentUser?.lastName[0] as string, 3, '9')}`;

  const contenUserMenu = {
    subtitle: 'ACCOUNT',
    base: [
      {
        title: `${currentUser?.firstName} ${currentUser?.lastName}`,
        article: currentUser?.mail
      }
    ]
  };

  const block = () => {
    switch (menuItem) {
      case 'userMenu':
        return contenUserMenu;
      case 'project':
        return contentProject;
    }
  };
  const link = (id: string) => {
    switch (menuItem) {
      case 'project':
        return `/projects/${id}`;
      default:
        return '/';
    }
  };

  return (
    <>
      <div className={classes.itemsBlock}>
        <p className={classes.submenu_subtitle}>{(block() as blockType).subtitle}</p>
        <ul className={classes.submenu_itemsList}>
          {menuItem === 'project' &&
            (block() as blockType).base.map((item, i) => {
              return (
                <SubmenuItemLine
                  key={i}
                  title={item.title}
                  article={item.article}
                  project={'Software project'}
                  src={item.pathImage}
                  bgColor={item.bgColor}
                  link={link(item._id)}
                  id={item._id}
                  type={'project'}
                  marked={Boolean(
                    currentUser?.notedItems.find((marked) => marked.id === item._id)
                  )}></SubmenuItemLine>
              );
            })}
        </ul>
      </div>
      {menuItem === 'userMenu' && (
        <>
          <SubmenuItemLine
            key={currentUser?._id}
            title={`${currentUser?.firstName} ${currentUser?.lastName}`}
            article={currentUser?.mail as string}
            project=""
            src=""
            type={'profile'}
            bgColor={userColor}></SubmenuItemLine>
          <div className={classes.itemsBlock + ' ' + classes.itemsBlock__jira}>
            <p className={classes.submenu_subtitle}>JIRA</p>
            <SubmenuItemLine
              key={currentUser?._id}
              title={'Profile'}
              article=""
              project=""
              src=""
              bgColor={userColor}></SubmenuItemLine>
          </div>
        </>
      )}
    </>
  );
};

export default SubmenuItemsBlock;
