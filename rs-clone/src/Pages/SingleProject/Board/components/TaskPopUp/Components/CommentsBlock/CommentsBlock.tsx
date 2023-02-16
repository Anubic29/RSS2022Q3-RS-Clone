import classes from './CommentsBlock.module.scss';
import React, { useState, useEffect } from 'react';
import TextRedactorBlock from '../../../../../../../Components/TextRedactorBlock/TextRedactorBlock';
import CommentRow from '../CommentRow/CommentRow';
import UserIcon from '../../../../../../../Components/userIcon/UserIcon';
import { BiSortDown, BiSortUp } from 'react-icons/bi';

export type commentDetails = {
  id: string;
  userName: string;
  dateCreated: number;
  body: string;
};

const CommentsBlock = () => {
  const [savedDescr, setSavedDescr] = useState<commentDetails[]>([]);
  const [editorMode, setEditorMode] = useState(false);
  const [newestFirst, setNewestFirt] = useState(true);

  const onTextValueHandler = (val: string) => {
    const comment: commentDetails = {
      userName: 'User Name',
      id: Date.now().toString(),
      dateCreated: Date.now(),
      body: val
    };
    setSavedDescr((prevV) => {
      console.log([...prevV, comment]);
      return [...prevV, comment];
    });
  };

  const editorModeHandler = () => {
    setEditorMode(false);
  };

  const descriptAreaHandler = () => {
    setEditorMode(true);
  };

  const deleteHandler = (id: string) => {
    setSavedDescr((array) => {
      console.log(array.filter((el) => el.id !== id));
      return array.filter((el) => el.id !== id);
    });
  };
  const sortHandler = () => {
    setNewestFirt(newestFirst ? false : true);
  };

  return (
    <div className={classes.commentsWrap}>
      <div className={classes.commentDetails_editorWrap}>
        <div className={classes.commentDetails_iconColumn}>
          <UserIcon user={'OD'} />
        </div>
        <div className={classes.commentDetails_commentColumn}>
          <div
            onClick={descriptAreaHandler}
            className={
              classes.commentDetails_savedDescript +
              ' ' +
              (editorMode ? classes.hidden : classes.visible)
            }>
            Add comment
          </div>
          <div className={`${classes.editor} ${editorMode ? classes.visible : classes.hidden}`}>
            <TextRedactorBlock
              onTextValue={onTextValueHandler}
              placeholder="Add description"
              onEditorMode={editorModeHandler}
              initialValue={false}
            />
          </div>
        </div>
      </div>
      {savedDescr.length > 1 && (
        <div className={classes.comments_sortDiv} onClick={sortHandler}>
          {newestFirst ? (
            <>
              <p>Show oldest first</p>
              <BiSortDown />
            </>
          ) : (
            <>
              <p>Show newest first</p>
              <BiSortUp />
            </>
          )}
        </div>
      )}
      {savedDescr.length > 0 &&
        savedDescr
          .sort((a, b) =>
            newestFirst ? b.dateCreated - a.dateCreated : a.dateCreated - b.dateCreated
          )
          .map((comment) => (
            <CommentRow
              id={comment.id}
              userName={comment.userName}
              body={comment.body}
              dateCreated={comment.dateCreated}
              key={comment.id}
              onDelete={deleteHandler}
            />
          ))}
    </div>
  );
};

export default CommentsBlock;
