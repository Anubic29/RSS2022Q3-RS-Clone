import TaskType from '../../../../Types/Task/TaskType';
import { ColumnHeader, ColumnBody } from './components';

import styles from './Column.module.scss';

interface ColumnProps {
  id: string;
  title: string;
  tasks: TaskType[];
  stickyHeader?: boolean;
  dragHandlersTask: {
    dragStartHandlerTask: (event: React.DragEvent, task: string) => void;
    dragEndHandlerTask: (event: React.DragEvent) => void;
    dragLeaveHandlerTask: (event: React.DragEvent) => void;
    dragOverHandlerTask: (event: React.DragEvent) => void;
    dropHandlerTask: (event: React.DragEvent, column: string) => void;
  };
  dragStartHandlerColumn: (event: React.DragEvent, column: string) => void;
  dragLeaveHandlerColumn: (event: React.DragEvent) => void;
  dragEndHandlerColumn: (event: React.DragEvent) => void;
}

function Column(props: ColumnProps) {
  return (
    <div className={styles['column-container']}>
      <div className={styles.column}>
        <ColumnHeader
          id={props.id}
          title={props.title}
          tasksCount={props.tasks.length}
          stickyHeader={props.stickyHeader}
          dragStartHandlerColumn={props.dragStartHandlerColumn}
          dragLeaveHandlerColumn={props.dragLeaveHandlerColumn}
          dragEndHandlerColumn={props.dragEndHandlerColumn}
        />
        <ColumnBody id={props.id} tasks={props.tasks} dragHandlersTask={props.dragHandlersTask} />
      </div>
    </div>
  );
}

export default Column;
