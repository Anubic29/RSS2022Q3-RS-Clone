import { useMemo } from 'react';
import { useBoard } from '../../../../../contexts';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';
import UserBtn from '../UserBtn/UserBtn';

import styles from './UserList.module.scss';

interface UserListProps {
  userIdList: string[];
}

function UserList(props: UserListProps) {
  const { getUserList } = useBoard();

  const userListDisplay = useMemo(() => {
    return props.userIdList.map((userId) => getUserList().find((data) => data._id === userId));
  }, [props.userIdList, getUserList()]);

  return (
    <div className={styles['user-list']}>
      {userListDisplay.map((user) => {
        if (user) {
          const colorPart1 = convertLetterToHex(user.firstName[0], 3, '9');
          const colorPart2 = convertLetterToHex(user.lastName[0], 3, '9');
          return (
            <UserBtn
              key={user._id}
              type="checkbox"
              _id={user._id}
              title={`${user.firstName} ${user.lastName}`}
              content={user.firstName[0] + user.lastName[0]}
              color={`#${colorPart1}${colorPart2}`}
            />
          );
        }
      })}
    </div>
  );
}

export default UserList;
