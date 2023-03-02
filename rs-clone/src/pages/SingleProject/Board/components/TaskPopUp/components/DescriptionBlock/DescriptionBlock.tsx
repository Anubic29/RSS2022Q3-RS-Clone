import classes from './DescriptionBlock.module.scss';
import React, { ReactNode, useEffect, useState } from 'react';
import { TextRedactorBlock } from '../../../../../../../components';
import parse from 'html-react-parser';
import { useBoard } from '../../../../../../../contexts';

const DescriptionBlock = (props: { id: string; descript: string }) => {
  const [savedDescr, setSavedDescr] = useState<string | JSX.Element | JSX.Element[]>(
    parse(props.descript)
  );

  const [editorMode, setEditorMode] = useState(false);

  const { updateTask } = useBoard();

  const onTextValueHandler = (val: string) => {
    if (val === '<p><br></p>') val = '';
    const parsed = parse(val);
    setSavedDescr(parsed);
    updateTask(props.id, { description: val });
  };

  const editorModeHandler = () => {
    setEditorMode(false);
  };

  const descriptAreaHandler = () => {
    setEditorMode(true);
  };

  return (
    <div className={classes.taskDetails_editorWrap}>
      <div
        onClick={descriptAreaHandler}
        className={
          classes.taskDetails_savedDescript + ' ' + (editorMode ? classes.hidden : classes.visible)
        }>
        {typeof savedDescr === 'string' && !savedDescr
          ? 'Add text'
          : savedDescr instanceof Array && savedDescr.length === 0
          ? 'Add text'
          : (savedDescr as ReactNode)}
      </div>
      <div className={`${classes.editor} ${editorMode ? classes.visible : classes.hidden}`}>
        <TextRedactorBlock
          onTextValue={onTextValueHandler}
          placeholder="Add description"
          onEditorMode={editorModeHandler}
          initialValue={props.descript || true}
          init={props.descript}
        />
      </div>
    </div>
  );
};

export default DescriptionBlock;
