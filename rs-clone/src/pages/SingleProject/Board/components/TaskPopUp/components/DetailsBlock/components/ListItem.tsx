import { useState } from 'react';
import { BsPinAngle } from 'react-icons/bs';
import { TbPinned } from 'react-icons/tb';
import UserIcon from '../../../../../../../../components/UserIcon/UserIcon';
import classes from './ListItem.module.scss';

interface ListItemProps {
  title: string;
  value: string;
  type: 'name' | 'tags';
  pinned: (pin: string, isPinned: boolean) => boolean;
  isPinned: boolean;
}

const ListItem = (props: ListItemProps) => {
  const [isPinned, setIsPinned] = useState(props.isPinned);
  const onPinHandler = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    if (isPinned) {
      setIsPinned(false);
      props.pinned(props.title, false);
    } else {
      setIsPinned(true);
      props.pinned(props.title, true);
    }
  };

  return (
    <li className={classes.details_ListItem}>
      <div className={classes.details_listItemCol__left}>
        <p>{props.title}</p>
        <BsPinAngle className={classes.pin} onClick={(e) => onPinHandler(e)} />
      </div>
      <div className={classes.details_listItemCol__right}>
        {props.type === 'name' && (
          <div className={classes.details_userIconDiv}>{`${props.value.split(' ')[0][0]}${
            props.value.split(' ')[1][0]
          }`}</div>
        )}
        <p>{props.value}</p>
      </div>
    </li>
  );
};

export default ListItem;
