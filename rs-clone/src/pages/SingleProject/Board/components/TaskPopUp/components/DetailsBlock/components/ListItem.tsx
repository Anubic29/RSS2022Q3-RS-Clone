import { useState } from 'react';
import { BsPinAngle } from 'react-icons/bs';
import classes from './ListItem.module.scss';
import UserType from '../../../../../../../../types/user/userType';
import BoxWithShadow from '../../../../../../../../components/BoxWithShadow/BoxWithShadow';
import FlipMenu from '../../FlipMenu/FlipMenu';

interface ListItemProps {
  title: string;
  name: string;
  id: string;
  type: 'name' | 'tags';
  pinned: (pin: string, isPinned: boolean) => boolean;
  isPinned: boolean;
  assignToMe: boolean;
  team: UserType[];
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
      <div className={classes.userRow_wrap}>
        <div
          className={`${classes.usersListRow} ${props.title === 'asignee' ? classes.hover : ''}`}>
          {props.type === 'name' && (
            <div className={classes.details_userIconDiv}>{`${props.name
              .split(' ')
              .map((name) => name[0])
              .join('')}`}</div>
          )}
          <p>{props.name}</p>
        </div>
        {props.assignToMe && props.title === 'asignee' && (
          <button className={classes.assignToMeBtn}>Assign to me</button>
        )}
        {props.team.length > 0 && props.title === 'asignee' && (
          <BoxWithShadow>
            <div className={classes.asigneeListWrap}>
              <ul className={classes.assigneeUl}>
                {props.team.map((user, i) => (
                  <li className={classes.assigneeLi} key={i}>
                    {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
            </div>
          </BoxWithShadow>
        )}
      </div>
    </li>
  );
};

export default ListItem;
