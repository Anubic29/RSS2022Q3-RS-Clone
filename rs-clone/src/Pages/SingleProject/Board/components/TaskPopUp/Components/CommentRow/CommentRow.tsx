import React, { useState } from 'react';
import classes from './CommentRow.module.scss';
import TextRedactorBlock from '../../../../../../../components/TextRedactorBlock/TextRedactorBlock';
import parse from 'html-react-parser';
import UserIcon from '../../../../../../../components/UserIcon/UserIcon';
import { useComments } from '../../../../../../../contexts/Comments.context';

const SECOND = 1000;
const MINUTE = 60;
const HOUR = 60;
const MINSINDAY = 1440;

const CommentRow = (props: {
  _id: string;
  author: string;
  date: string;
  dateUpdate: string;
  text: string;
  onDelete: (id: string) => void;
  taskId: string;
}) => {
  const getTimeDifference = (timeCreated: number) => {
    const diffMs = Math.abs(Date.now() - timeCreated);
    const minutes = Math.floor((diffMs / SECOND / MINUTE) << 0);
    if (minutes < 0) return 'unknown';
    if (minutes < 2) return `posted just now`;
    if (minutes >= 2 && minutes < HOUR) return `posted ${minutes} min ago`;
    if (minutes >= 60 && minutes < MINSINDAY) {
      return `posted ${Math.floor(minutes / HOUR)} hours ago`;
    }
    if (minutes >= MINSINDAY) {
      return `posted long time ago`;
    }
  };

  const { updateComment } = useComments();

  const [isEditMode, setEditMode] = useState(false);
  const [commentBody, setCommentBody] = useState(props.text);
  const [postedTimeAgo, setPostedTimeAgo] = useState(getTimeDifference(JSON.parse(props.date)));
  const [isEdited, setIsEdited] = useState<string | null>(
    props.date !== props.dateUpdate ? props.dateUpdate : null
  );
  setInterval(() => setPostedTimeAgo(getTimeDifference(JSON.parse(props.date))), 60000);

  const editModeHandler = (val: boolean) => {
    setEditMode(val);
  };

  const textValueHandler = (textValue: string) => {
    updateComment(props.taskId, props._id, {
      _id: props._id,
      text: textValue,
      author: props.author,
      date: props.date,
      dateUpdate: JSON.stringify(Date.now())
    });
    setCommentBody(textValue);
  };
  const deleteHandler = (id: string) => {
    props.onDelete(id);
  };

  const setIsEditedHandler = (date: string) => {
    setIsEdited(date);
  };

  return (
    <div className={classes.commentRow_wrap}>
      <div className={classes.commentRow_IconColumn}>
        <UserIcon user={'OD'} />
      </div>
      <div className={classes.commentRow_TextColumn}>
        <p className={classes.commentRow_TopLine}>
          <span className={classes.commentRow_UserNameSpan}>User Name</span>
          <span
            className={classes.commentRow_TimeSpan}
            data-title={`created on ${new Date(JSON.parse(props.date)).toLocaleString()}`}>
            {postedTimeAgo}
          </span>
          {props.date != props.dateUpdate && isEdited && (
            <span
              className={classes.commentRow_TimeSpan}
              data-title={`edited at ${new Date(JSON.parse(isEdited)).toLocaleString()}`}>
              Edited
            </span>
          )}
        </p>
        <div className={classes.commentRow_CommentBody}>{parse(commentBody)}</div>
        <div
          className={
            classes.commentRow_EditorWrap + ' ' + (isEditMode ? classes.visible : classes.hidden)
          }>
          <TextRedactorBlock
            placeholder=""
            onTextValue={textValueHandler}
            onEditorMode={editModeHandler}
            initialValue={commentBody}
            onIsEdited={setIsEditedHandler}
          />
        </div>
        <div
          className={`${classes.commentRow_actionsBlock} ${classes.ButtonsWrap} ${
            isEditMode ? classes.hidden : classes.visible
          }`}>
          <button className={classes.buttonSubmit} onClick={() => setEditMode(true)}>
            Edit
          </button>
          <button className={classes.buttonReset} onClick={() => deleteHandler(props._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentRow;
