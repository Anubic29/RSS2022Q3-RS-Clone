import classes from './CommentsBlock.module.scss';
import React, { useState, useEffect } from 'react';
import TextRedactorBlock from '../../../../../../../components/TextRedactorBlock/TextRedactorBlock';
import CommentRow from '../CommentRow/CommentRow';
import UserIcon from '../../../../../../../components/UserIcon/UserIcon';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { useComments } from '../../../../../../../contexts/Comments.context';
import { useUser } from '../../../../../../../contexts';

type CommentType = {
  _id: string;
  text: string;
  author: string;
  date: string;
  dateUpdate: string;
};

const CommentsBlock = (props: { taskId: string }) => {
  const { getCommentsList, addComment, updateComment, deleteComment } = useComments();
  const list = getCommentsList();
  const [savedDescr, setSavedDescr] = useState<CommentType[]>(list);
  const [editorMode, setEditorMode] = useState(false);
  const [newestFirst, setNewestFirt] = useState(true);

  const { currentUser } = useUser();

  useEffect(() => {
    setSavedDescr(list);
  }, [list]);

  const onTextValueHandler = async (val: string, id?: string) => {
    if (!id) {
      addComment(props.taskId, {
        text: val,
        author: currentUser ? currentUser._id : '',
        date: JSON.stringify(Date.now()),
        dateUpdate: ''
      });
    }
    if (id) {
      updateComment(props.taskId, id, {
        _id: id,
        text: val,
        author: currentUser ? currentUser._id : '',
        date: '',
        dateUpdate: JSON.stringify(Date.now())
      });
    }
  };

  const editorModeHandler = () => {
    setEditorMode(false);
  };

  const descriptAreaHandler = () => {
    setEditorMode(true);
  };

  const deleteHandler = (id: string) => {
    deleteComment(props.taskId, id);
  };
  const sortHandler = () => {
    setNewestFirt(newestFirst ? false : true);
  };

  return (
    <div className={classes.commentsWrap}>
      <div className={classes.commentDetails_editorWrap}>
        <div className={classes.commentDetails_iconColumn}>
          <UserIcon
            userFrst={currentUser?.firstName as string}
            userLast={currentUser?.lastName as string}
          />
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
            newestFirst
              ? JSON.parse(b.date) - JSON.parse(a.date)
              : JSON.parse(a.date) - JSON.parse(b.date)
          )
          .map((comment) => (
            <CommentRow
              taskId={props.taskId}
              _id={comment._id}
              author={comment.author}
              text={comment.text}
              date={JSON.parse(comment.date)}
              key={comment._id}
              onDelete={deleteHandler}
              dateUpdate={comment.dateUpdate}
            />
          ))}
    </div>
  );
};

export default CommentsBlock;
