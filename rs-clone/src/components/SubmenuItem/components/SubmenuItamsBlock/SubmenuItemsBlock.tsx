import React, { useEffect, useState } from 'react';
import SubmenuItemLine from '../SubmenuItemLine/SubmenuItemLine';
import classes from '../../SubmenuItem.module.scss';
import { useUser } from '../../../../contexts';
import { useTasks } from '../../../../contexts/TasksContext';
import { useProjects } from '../../../../contexts';
import { useBoard } from '../../../../contexts/Board.context';
import CommentTaskType from '../../../../types/task/сommentTaskType';
import { convertLetterToHex } from '../../../../utils/convertLetterToHex';
import { colorSecondary } from '../../../../theme/variables';
import { ColumnList } from '../../../../pages/SingleProject/Board/components';

type TaskType = {
  _id: string;
  id: number;
  title: string;
  description: string;
  author: string;
  executor: string;
  projectId: string;
  columnId: string;
  commentList: CommentTaskType[];
  __v: number;
};

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

const board = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    title: 'Доска CBC',
    article: '',
    project: 'Company BDSM',
    bgColor: '#4cade8',
    columnId: ''
  }
];

const SubmenuItemsBlock: React.FC<{ onTabChange: string; menuItem: string }> = (props) => {
  const menuItem = props.menuItem;
  const tab = props.onTabChange;
  const { currentUser } = useUser();
  const { getTasks } = useTasks();
  const { projects } = useProjects();
  const { getColumnList } = useBoard();

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [currentProjects] = useState(projects || []);

  useEffect(() => {
    const tasks = async () => {
      const list = await getTasks();
      setTasks(list);
    };
    tasks();
  }, []);

  const contentProject = {
    subtitle: 'RECENT',
    base: currentProjects
  };

  const contentWork = {
    subtitle: tab === 'assigned' ? 'DEV READY' : 'RECENT',
    base: tab === 'assigned' ? tasks : board
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
      case 'work':
        return contentWork;
      case 'userMenu':
        return contenUserMenu;
      case 'project':
        return contentProject;
    }
  };
  const link = (id: string, projectIdForTask?: string) => {
    switch (menuItem) {
      case 'work':
        if (tab === 'assigned') return `/projects/${projectIdForTask}/selected-task/${id}`;
        if (tab === 'board') return '/';
        break;
      case 'project':
        return `/projects/${id}`;
      default:
        return '/';
    }
  };

  const usedColumns = () => {
    const columnsList = getColumnList();
    console.log(columnsList);
    const filtered = columnsList.map((el) => {
      for (const task of tasks) {
        if (task.columnId === el._id) return el;
      }
    });
    return filtered;
  };
  console.log(usedColumns());
  return (
    <>
      <div className={classes.itemsBlock}>
        <p className={classes.submenu_subtitle}>{(block() as blockType).subtitle}</p>
        <ul className={classes.submenu_itemsList}>
          {menuItem === 'work' &&
            tab === 'assigned' &&
            (block() as blockType).base.map((item, i) => {
              console.log(item);
              return (
                <SubmenuItemLine
                  key={i}
                  title={item.title}
                  article={item.article}
                  project={item.project}
                  src=""
                  bgColor={colorSecondary}
                  type={'assigned'}
                  columnId={item.columnId}
                  link={link(item._id, item.projectId)}></SubmenuItemLine>
              );
            })}
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
                  link={link(item._id, item.projectId)}
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
