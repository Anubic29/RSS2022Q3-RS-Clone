import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsLink45Deg } from 'react-icons/bs';
import Modal from '../../../../../Components/Modal/Modal';
import EditableTitle from '../../../../../Components/EditableTitle/EditableTitle';
import classes from './TaskPopUp.module.scss';
import DescriptionBlock from './Components/DescriptionBlock/DescriptionBlock';
import CommentsBlock from './Components/CommentsBlock/CommentsBlock';

// interface SavedValue {
//   descriptValue: string | JsxElement | JsxElement[];
// }

const TaskPopUp = () => {
  const data = {
    title: 'Editable Title'
  };

  return (
    <>
      <Modal translate="twenty">
        <>
          <div className={classes.taskDetails_wrap}>
            <div className={classes.taskDetails_col__left}>
              <div className={classes.taskDetails_topLine}>
                <Link to="/">
                  <span className={classes.taskDetails_code}>CBC-18</span>
                  <BsLink45Deg />
                </Link>
              </div>
              <div className={classes.taskDetails_taskName}>
                <EditableTitle titleProp={data.title} />
              </div>
              <div className={classes.taskDetails_taskActions}></div>
              <div className={classes.taskDetails_taskDescriptionBlock}>
                <h6 className={classes.taskDetails_descr__title}>Description</h6>
                <DescriptionBlock />
              </div>
              <div className={classes.taskDetails_commentsBlock}>
                <h6 className={classes.taskDetails_descr__title}>Comments</h6>
                <CommentsBlock />
              </div>
            </div>
            <div className={classes.taskDetails_col__right}>
              <div className={classes.taskDetails_topLine}></div>
              <div className={classes.taskDetails_otherDetailsBlock}></div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default TaskPopUp;
