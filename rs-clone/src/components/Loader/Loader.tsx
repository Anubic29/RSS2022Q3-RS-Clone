import React from 'react';
import { ReactComponent as LoaderImg } from '../../assets/loader/three-dots.svg';
import classes from './Loader.module.scss';

const Loader = () => {
  return (
    <>
      <div className={classes.bg}>
        <LoaderImg className={classes.loader} />
      </div>
    </>
  );
};

export default Loader;
