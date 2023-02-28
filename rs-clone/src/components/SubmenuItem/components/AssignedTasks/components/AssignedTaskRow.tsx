import React, { useEffect, useState } from 'react';
import classes from './AssignedTaskRow.module.scss';
import TaskType from '../../../../../types/task/taskType';
import { Link } from 'react-router-dom';
import { MdDone } from 'react-icons/md';
import { useProjects } from '../../../../../contexts';

type assignProps = {
  task: TaskType;
  title: string;
};

function AssignedTaskRow(props: TaskType) {
  const closeProjMenuHandler = () => {
    window.location.reload();
  };

  return (
    <div key={Math.random()}>
      <p onClick={() => closeProjMenuHandler()}>
        <Link
          className={classes.profileMenu_row}
          to={`/projects/${props.projectId}/board/selected-task/${props._id}`}>
          <span className={classes.projectMenu_img}>
            <MdDone></MdDone>
          </span>
          <span className={classes.projectMenu_span}>{props.title}</span>
        </Link>
      </p>
    </div>
  );
}

export default AssignedTaskRow;
