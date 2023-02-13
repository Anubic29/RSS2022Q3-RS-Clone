import React, { useState, useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill';
import Button from '../Button/Button';
import 'react-quill/dist/quill.snow.css';
import classes from './TextRedactorBlock.module.scss';

type TextRedactorProps = {
  placeholder: string;
  onTextValue: (val: string) => void;
  onEditorMode: (isEditorActive: boolean) => void;
  initialValue: string | boolean;
  onIsEdited?: (date: number) => void;
};

const TextRedactorBlock = ({
  placeholder,
  onTextValue,
  onEditorMode,
  initialValue,
  onIsEdited
}: TextRedactorProps) => {
  const [value, setValue] = useState(initialValue || '');

  const valueHandler = (e: string) => {
    setValue(e);
  };

  const saveHandler = () => {
    if (value === '<p><br></p>' || !value) return;
    onTextValue(typeof value === 'string' ? value : '');
    onEditorMode(false);
    console.log(initialValue);
    setValue(initialValue ? value : '');
    if (onIsEdited) onIsEdited(Date.now());
  };

  console.log('redactor', initialValue);

  return (
    <div>
      <ReactQuill
        value={value as string}
        onChange={(e) => valueHandler(e)}
        placeholder={placeholder}
      />
      <div className={classes.ButtonsWrap}>
        <Button type="submit" className={classes.buttonSubmit} onClick={saveHandler}>
          Save
        </Button>
        <Button type="reset" className={classes.buttonReset} onClick={() => onEditorMode(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TextRedactorBlock;
