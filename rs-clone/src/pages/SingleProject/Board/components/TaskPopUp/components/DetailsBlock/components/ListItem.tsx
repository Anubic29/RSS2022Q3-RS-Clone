import { useEffect, useState } from 'react';
import { BsPinAngle } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import classes from './ListItem.module.scss';
import UserType from '../../../../../../../../types/user/userType';
import { BoxWithShadow, UserIcon } from '../../../../../../../../components';
import useComponentVisible from '../../../../../../../../hooks/useComponentVisible/useInputVisible';
import { useUser, useBoard } from '../../../../../../../../contexts';
import CurrentUserType from '../../../../../../../../types/user/currentUserType';
import { type } from 'os';

interface ListItemProps {
  taskId: string;
  title: string;
  name: string;
  id: string;
  type: 'name' | 'tags';
  pinned: (pin: string, isPinned: boolean) => boolean;
  isPinned: boolean;
  assignToMe: boolean;
  team: UserType[];
  author: string;
  asignee: string;
}

const ListItem = (props: ListItemProps) => {
  const { currentUser } = useUser();

  const userName = (userId: string, team: UserType[]) => {
    if (userId === 'auto') return 'Not assigned';
    const userObj = team.find((user) => user._id === userId);
    return `${userObj?.firstName} ${userObj?.lastName}`;
  };

  const [isPinned, setIsPinned] = useState(props.isPinned);
  const [inputValue, setInputValue] = useState(userName(props.asignee, props.team));
  const [listToAssign, setListToAsign] = useState(props.team);

  const {
    ref: asigneeListRef,
    isComponentVisible: isVisibleAsigneeList,
    setIsComponentVisible: setIsVisibleList
  } = useComponentVisible(false);

  useEffect(() => {
    if (!isVisibleAsigneeList) setInputValue('');
  }, [isVisibleAsigneeList]);

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

  const searchAsigneeHandler = (title: string) => {
    if (title === 'asignee') {
      setIsVisibleList(true);
    }
  };
  const { updateTask } = useBoard();

  const asigneeChangeHandler = (userId: string) => {
    updateTask(props.taskId, { executor: userId });
  };

  const ListToAsign = () => {
    return (
      <ul className={classes.assigneeUl}>
        <li className={classes.assigneeLi} onMouseDown={() => asigneeChangeHandler('auto')}>
          <FaUserCircle className={classes.unassignedIcon} /> <span>Not assigned</span>
        </li>
        {listToAssign.length > 0 &&
          listToAssign.map((user, i) => {
            if (typeof user === 'object') {
              return (
                <li
                  className={classes.assigneeLi}
                  key={i}
                  onMouseDown={() => asigneeChangeHandler(user._id)}>
                  <UserIcon
                    userFrst={
                      props.team.find((userT) => userT._id === user._id)?.firstName as string
                    }
                    userLast={
                      props.team.find((userT) => userT._id === user._id)?.lastName as string
                    }
                  />
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                </li>
              );
            }
          })}
      </ul>
    );
  };

  const asigneeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsVisibleList(true);
  };
  useEffect(() => {
    const list = props.team.filter((user) =>
      (user.firstName + ' ' + user.lastName).includes(inputValue)
    );
    setListToAsign(list);
  }, [inputValue]);

  return (
    <li className={classes.details_ListItem}>
      <div className={classes.details_listItemCol__left}>
        <p>{props.title}</p>
        <BsPinAngle className={classes.pin} onClick={(e) => onPinHandler(e)} />
      </div>
      <div className={classes.userRow_wrap}>
        <div className={classes.asigneeWrap}>
          {!isVisibleAsigneeList && (
            <div
              className={`${classes.usersListRow} ${
                props.title === 'asignee' ? classes.hover : ''
              }`}
              onClick={() => searchAsigneeHandler(props.title)}>
              {(props.title === 'asignee' && props.asignee === 'auto' && (
                <FaUserCircle className={classes.unassignedIcon} />
              )) || (
                <UserIcon
                  userFrst={
                    props.title === 'asignee'
                      ? userName(props.asignee, props.team).split(' ')[0]
                      : userName(props.author, props.team).split(' ')[0]
                  }
                  userLast={
                    props.title === 'asignee'
                      ? userName(props.asignee, props.team).split(' ')[1]
                      : userName(props.author, props.team).split(' ')[1]
                  }
                />
              )}
              <p>
                {props.title === 'asignee'
                  ? userName(props.asignee, props.team)
                  : userName(props.author, props.team)}
              </p>
            </div>
          )}
          {props.assignToMe && !isVisibleAsigneeList && props.title === 'asignee' && (
            <button
              className={classes.assignToMeBtn}
              onClick={() => asigneeChangeHandler((currentUser as CurrentUserType)._id as string)}>
              Assign to me
            </button>
          )}
        </div>
        {isVisibleAsigneeList && (
          <input
            ref={asigneeListRef}
            className={classes.usersListRow}
            value={inputValue}
            onChange={(e) => {
              asigneeInputHandler(e);
            }}
          />
        )}
        {props.team.length > 0 && props.title === 'asignee' && isVisibleAsigneeList && (
          <BoxWithShadow>
            <div className={classes.asigneeListWrap}>
              <ListToAsign />
            </div>
          </BoxWithShadow>
        )}
      </div>
    </li>
  );
};

export default ListItem;
