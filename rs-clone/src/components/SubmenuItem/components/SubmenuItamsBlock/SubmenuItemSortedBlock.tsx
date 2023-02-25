import React, { useEffect, useState, useMemo } from 'react';
import SubmenuItemLine from '../SubmenuItemLine/SubmenuItemLine';
import classes from '../../SubmenuItem.module.scss';
import { useTasks } from '../../../../contexts/TasksContext';
import { colorSecondary } from '../../../../theme/variables';
import { useProjects } from '../../../../contexts';
import TaskType from '../../../../types/task/taskType';

const SubmenuItemsBlock: React.FC<{ onTabChange: string; menuItem: string }> = (props) => {
  const menuItem = props.menuItem;
  const tab = props.onTabChange;
  const { projects, getColumnById } = useProjects();
  const { tasksToDo, getTasksToDo } = useTasks();
  const [currentTasks, setCurrentTasks] = useState<TaskType[]>(tasksToDo);

  const columnListDisplay = useMemo(() => {
    return Array.from(new Set(currentTasks.map((column) => column.columnId)));
  }, [currentTasks]);

  useEffect(() => {
    const fetchedTasks = async () => {
      const data = await getTasksToDo();
      return data;
    };
    fetchedTasks()
      .then((data) => {
        setCurrentTasks(data);
      })
      .catch((e) => console.log(e));
  }, []);

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
  const tasksBlocks = columnListDisplay.map((column) =>
    currentTasks.filter((task) => task.columnId === column)
  );

  return (
    <>
      <div className={classes.itemsBlock}>
        {tab === 'assigned' &&
          tasksBlocks.map((block, i) => {
            return (
              <div key={i}>
                <p className={classes.submenu_subtitle}>
                  {getColumnById(block[0].columnId)?.title.toUpperCase()}
                </p>
                <ul className={classes.submenu_itemsList}>
                  {block.map((task) => (
                    <SubmenuItemLine
                      key={task._id}
                      title={task.title}
                      article={`${
                        projects.find((project) => project._id === task.projectId)?.key as string
                      }-`}
                      project={
                        projects.find((project) => project._id === task.projectId)?.title as string
                      }
                      src=""
                      bgColor={colorSecondary}
                      type={'assigned'}
                      link={link(task._id, task.projectId)}></SubmenuItemLine>
                  ))}
                </ul>
              </div>
            );
          })}

        {tab === 'board' && (
          <>
            <p className={classes.submenu_subtitle}>{'RECENT'}</p>
            <ul className={classes.submenu_itemsList}>
              <SubmenuItemLine
                key={'1'}
                title={'Доска CBC'}
                article={''}
                project={'Company BDSM'}
                src=""
                bgColor={colorSecondary}
                type={'assigned'}
                link={'/'}></SubmenuItemLine>
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default SubmenuItemsBlock;
