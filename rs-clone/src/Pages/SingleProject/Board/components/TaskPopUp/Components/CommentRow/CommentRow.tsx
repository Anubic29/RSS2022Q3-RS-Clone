import React, { useState } from 'react';
import classes from './CommentRow.module.scss';
import TextRedactorBlock from '../../../../../../../Components/TextRedactorBlock/TextRedactorBlock';
import parse from 'html-react-parser';
import UserIcon from '../../../../../../../Components/userIcon/UserIcon';

const CommentRow = (props: {
  id: string;
  userName: string;
  dateCreated: number;
  body: string;
  onDelete: (id: string) => void;
}) => {
  const getTimeDifference = (timeCreated: number) => {
    const diffMs = Math.abs(Date.now() - timeCreated);
    const minutes = Math.floor((diffMs / 1000 / 60) << 0);
    if (minutes < 0) return 'unknown';
    if (minutes < 2) return `posted just now`;
    if (minutes >= 2 && minutes < 60) return `posted ${minutes} min ago`;
    if (minutes >= 60 && minutes < 1440) {
      return `posted ${Math.floor(minutes / 60)} hours ago`;
    }
    if (minutes >= 1440) {
      return `posted long time ago`;
    }
  };
  const [isEditMode, setEditMode] = useState(false);
  const [commentBody, setCommentBody] = useState(props.body);
  const [postedTimeAgo, setPostedTimeAgo] = useState(getTimeDifference(props.dateCreated));
  const [isEdited, setIsEdited] = useState<number | null>(null);

  setInterval(() => setPostedTimeAgo(getTimeDifference(props.dateCreated)), 60000);

  const editModeHandler = (val: boolean) => {
    setEditMode(val);
  };

  const textValueHandler = (textValue: string) => {
    setCommentBody(textValue);
  };

  const deleteHandler = (id: string) => {
    props.onDelete(id);
  };

  const setIsEditedHandler = (date: number) => {
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
            data-title={`created on ${new Date(props.dateCreated).toLocaleString()}`}>
            {postedTimeAgo}
          </span>
          {isEdited && (
            <span
              className={classes.commentRow_TimeSpan}
              data-title={`edited at ${new Date(isEdited).toLocaleString()}`}>
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
          <button className={classes.buttonReset} onClick={() => deleteHandler(props.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentRow;
