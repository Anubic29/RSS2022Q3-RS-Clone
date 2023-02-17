import React from 'react';
import classes from './Loader.module.scss';

interface textProp {
  text: string;
}

const Message: React.FC<textProp> = (props: textProp) => {
  return (
    <>
      <div className={classes.bg}>
        <p className={classes.text}>{props.text}</p>
      </div>
    </>
  );
};

export default Message;
