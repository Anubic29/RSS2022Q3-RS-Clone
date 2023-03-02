import React, { useEffect, useState, useMemo } from 'react';
import SubmenuItemLine from '../SubmenuItemLine/SubmenuItemLine';
import classes from '../../SubmenuItem.module.scss';
import { useTasks } from '../../../../contexts/TasksContext';
import { colorSecondary } from '../../../../theme/variables';
import { useProjects } from '../../../../contexts';
import TaskType from '../../../../types/task/taskType';

const SubmenuItemsBlock = () => {
  const { projects, getColumnById } = useProjects();
  const { tasksToDo, getTasksToDo } = useTasks();
  const [currentTasks, setCurrentTasks] = useState<TaskType[]>(tasksToDo);

  const columnListDisplay = useMemo(() => {
    return Array.from(new Set(currentTasks.map((column) => column.columnId)));
  }, [currentTasks]);

  useEffect(() => {
    const fetchedTasks = async () => {
      const data = await getTasksToDo();
      console.log(data);
      return data;
    };
    fetchedTasks()
      .then((data) => {
        setCurrentTasks(data);
      })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  }, []);

  const tasksBlocks = columnListDisplay.map((column) =>
    currentTasks.filter((task) => task.columnId === column)
  );

  return (
    <>
      <div className={classes.itemsBlock}>
        {tasksBlocks.map((block, i) => {
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
                    link={'a'}></SubmenuItemLine>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SubmenuItemsBlock;
