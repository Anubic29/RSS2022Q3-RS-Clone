import classes from './DescriptionBlock.module.scss';
import React, { ReactNode, useState } from 'react';
import TextRedactorBlock from '../../../../../../../components/TextRedactorBlock/TextRedactorBlock';
import parse from 'html-react-parser';

const DescriptionBlock = () => {
  const [savedDescr, setSavedDescr] = useState<string | JSX.Element | JSX.Element[]>('');

  const [editorMode, setEditorMode] = useState(false);

  const onTextValueHandler = (val: string) => {
    if (val === '<p><br></p>') val = '';
    const parsed = parse(val);
    setSavedDescr(parsed);
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
          initialValue={true}
        />
      </div>
    </div>
  );
};

export default DescriptionBlock;
