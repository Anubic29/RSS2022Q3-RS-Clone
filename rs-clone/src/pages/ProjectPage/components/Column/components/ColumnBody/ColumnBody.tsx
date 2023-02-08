import { Task } from '../../../';

import styles from './ColumnBody.module.scss';

interface ColumnBodyProps {
  id: string;
  tasks: {
    _id: string;
    id: number;
    title: string;
    columnId: string;
  }[];
  dragHandlersTask: {
    dragStartHandlerTask: (event: React.DragEvent, task: string) => void;
    dragEndHandlerTask: (event: React.DragEvent) => void;
    dragLeaveHandlerTask: (event: React.DragEvent) => void;
    dragOverHandlerTask: (event: React.DragEvent) => void;
    dropHandlerTask: (event: React.DragEvent, column: string) => void;
  };
}

function ColumnBody(props: ColumnBodyProps) {
  return (
    <div
      className={styles['task-list-block']}
      onDragOver={(event) => props.dragHandlersTask.dragOverHandlerTask(event)}
      onDrop={(event) => props.dragHandlersTask.dropHandlerTask(event, props.id)}>
      <div className={styles['task-list']}>
        {props.tasks.map((task, idx) => (
          <div
            className={styles['task-block']}
            key={idx}
            onDragStart={(event) => props.dragHandlersTask.dragStartHandlerTask(event, task._id)}
            onDragLeave={(event) => props.dragHandlersTask.dragLeaveHandlerTask(event)}
            onDragEnd={(event) => props.dragHandlersTask.dragEndHandlerTask(event)}
            draggable={true}>
            <Task title={task.title} keyTask={`key-${task.id}`} />
          </div>
        ))}
      </div>
      <div className={styles['add-field']}>+ Create Task</div>
    </div>
  );
}

export default ColumnBody;
