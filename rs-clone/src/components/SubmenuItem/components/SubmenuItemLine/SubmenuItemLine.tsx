import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SubmenuItemLine.module.scss';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FiCheck } from 'react-icons/fi';
import { useUser } from '../../../../contexts';

const SubmenuItemLine: React.FC<{
  title?: string;
  src?: string;
  article?: string;
  project?: string;
  bgColor?: string;
  link?: string;
  marked?: boolean;
  id?: string;
  type?: string;
  children?: string;
  columnId?: string;
}> = (props) => {
  const { notedItemList, addNotedItem, deleteNotedItem, currentUser } = useUser();
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(props.marked);

  useEffect(() => {
    setIsMarked(Boolean(notedItemList.find((el) => el.id === props.id)));
  }, [notedItemList]);

  const onMarkedProjectHandler = (val: boolean) => {
    if (props.id && props.type) {
      val ? addNotedItem(props.id, props.type) : deleteNotedItem(props.id);
    }
    setIsMarked(val);
  };

  return (
    <li
      onClick={(e) => {
        e.stopPropagation();
        navigate(props.link as string);
        window.location.reload();
      }}>
      <div className={classes.submenu_line}>
        {props.title !== 'Profile' && (
          <div
            className={
              classes.submenu_imgWrap +
              ' ' +
              (props.type === 'profile' ? classes.submenu_imgWrap__round : '')
            }
            style={{
              borderRadius: `${props.type === 'profile' ? '50%' : '5px'}`,
              backgroundColor: `${props.bgColor}`,
              backgroundImage: `url(${props.src})`
            }}>
            {props.type === 'profile' && currentUser
              ? `${currentUser.firstName[0].toUpperCase()}${currentUser.lastName[0].toUpperCase()}`
              : ''}
            {props.type === 'assigned' && <FiCheck className={classes.checked} />}
          </div>
        )}
        <div className={classes.submenu_texts}>
          <div className={classes.lineTitleMarked}>
            {props.type === 'assigned' && <p>{props.columnId}</p>}
            <p className={classes.submenu_itemTitles}>{props.title}</p>
            {isMarked ? (
              <AiFillStar
                className={classes.starIcon}
                onClick={function (e) {
                  e.stopPropagation();
                  onMarkedProjectHandler(false);
                }}
              />
            ) : !isMarked && props.marked !== undefined ? (
              <AiOutlineStar
                className={classes.starIcon}
                onClick={function (e) {
                  e.stopPropagation();
                  onMarkedProjectHandler(true);
                }}
              />
            ) : (
              ''
            )}
          </div>
          <div className={classes.submenu_itemDetails}>
            <span className={classes.itemDetails}>{props.article}</span>
            <span className={classes.itemDetails}>{props.project}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SubmenuItemLine;
