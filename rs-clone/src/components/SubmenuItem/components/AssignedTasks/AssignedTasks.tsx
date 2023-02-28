import React, { useEffect, useMemo, useState } from 'react';
import { useProjects } from '../../../../contexts';
import classes from './AssignedTasks.module.scss';
import { useTasks } from '../../../../contexts/TasksContext';
import TaskType from '../../../../types/task/taskType';
import AssignedTaskRow from './components/AssignedTaskRow';
import BoxWithShadow from '../../../BoxWithShadow/BoxWithShadow';
import { useNavigate } from 'react-router-dom';
import ProjectType from '../../../../types/project/projectType';
import EmptyData from '../../../EmptyData/EmptyData';
import SubmenuNav from '../SubmenuNav/SubmenuNav';

function AssignedTasks(props: { onVisHandler: () => void }) {
  const { projects, getColumnById } = useProjects();
  const { tasksToDo, getTasksToDo } = useTasks();
  const [currentTasks, setCurrentTasks] = useState<TaskType[]>(tasksToDo);
  const navigate = useNavigate();

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

  const tasksBlocks = columnListDisplay.map((column) =>
    currentTasks.filter((task) => task.columnId === column)
  );

  return (
    <div className={classes.profileMenu_wrap}>
      <BoxWithShadow>
        <div>
          <div className={classes.itemsBlock}>
            <SubmenuNav menuItem={'work'} onNavTabHandler={() => 'work'}></SubmenuNav>
            {tasksBlocks.length === 0 && (
              <div className={classes.recentInner_wrap}>
                <EmptyData text={'No assigned tasks to you'} />
              </div>
            )}
            {tasksBlocks.length > 0 &&
              tasksBlocks.map((block) => {
                return (
                  <div key={Math.random()} className={classes.profileMenu_inner}>
                    <h2 className={''}>{getColumnById(block[0].columnId)?.title.toUpperCase()}</h2>
                    <ul className={classes.submenu_itemsList}>
                      {block.map((task) => {
                        if (projects.length > 0) {
                          const title = projects.find((project) => project._id === task.projectId)
                            ?.title as string;
                          return AssignedTaskRow(task);
                        }
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
          <p
            className={`${classes.profileMenu_row} ${classes.profileMenu_row__logOut}`}
            onClick={() => {
              props.onVisHandler();
              navigate('/');
            }}>
            Go to home page
          </p>
        </div>
      </BoxWithShadow>
    </div>
  );
}

export default AssignedTasks;
