import { useEffect, useState } from 'react';
import UserType from '../../../../../types/user/userType';
import TaskType from '../../../../../types/task/taskType';
import ColumnProjectType from '../../../../../types/project/columnProjectType';
import { Column, UserAvatar } from '../';
import { ColumnBody } from '../Column/components';
import { useBoard } from '../../../../../contexts/Board.context';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';

import styles from './ColumnRowUser.module.scss';

interface ColumnRowUserProps {
  userId?: string;
  columnList: ColumnProjectType[];
  taskList: TaskType[];
  dragHandlersTask: {
    dragStartHandlerTask: (event: React.DragEvent, task: string) => void;
    dragEndHandlerTask: () => void;
    dragOverHandlerTask: (event: React.DragEvent) => void;
    dropHandlerTask: (event: React.DragEvent, column: string) => void;
  };
}

function ColumnRowUser(props: ColumnRowUserProps) {
  const { getUserList } = useBoard();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    setUser(getUserList().find((data) => data._id === props.userId));
  }, [getUserList(), props.userId]);

  return (
    <div className={styles['user-tasks']}>
      <div className={styles['user-Header']}>
        {user && (
          <>
            <div className={styles['user-header__avatar']}>
              <UserAvatar
                content={user.firstName[0] + user.lastName[0]}
                color={`#${convertLetterToHex(user.firstName[0], 3, '9')}${convertLetterToHex(
                  user.lastName[0],
                  3,
                  '9'
                )}`}
              />
            </div>
            {user.firstName} {user.lastName}
          </>
        )}
        {!user && <>Without Executor</>}
        <span className={styles['user-header__tasks']}>{props.taskList.length} tasks</span>
      </div>
      <div className={styles['column-list']}>
        {props.columnList.map((column) => {
          return (
            <div key={column._id}>
              <Column>
                <ColumnBody
                  id={column._id}
                  userId={props.userId}
                  type={column.type}
                  tasks={props.taskList.filter((task) => task.columnId === column._id)}
                  dragHandlersTask={props.dragHandlersTask}
                />
              </Column>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ColumnRowUser;
