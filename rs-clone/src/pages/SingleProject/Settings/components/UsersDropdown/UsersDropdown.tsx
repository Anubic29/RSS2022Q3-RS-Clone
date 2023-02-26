import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useBoard } from '../../../../../contexts';
import { UserAvatar } from '../../../../../components';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';
import UserType from '../../../../../types/user/userType';

import './UsersDropdown.scss';

interface UsersDropdownProps {
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setAuthor: Dispatch<SetStateAction<string>>;
  setAuthorId: Dispatch<SetStateAction<string>>;
}

function UsersDropdown(props: UsersDropdownProps) {
  const { setIsFocused, setAuthor, setAuthorId } = props;
  const { getUserList, projectInfo } = useBoard();
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    setUsers(getUserList());
  }, []);

  return (
    <ul className="UsersDropdown">
      {users.map((user) => {
        const { firstName, lastName, _id } = user;
        const fullName = `${firstName} ${lastName}`;
        const colorFirstHalf = convertLetterToHex(firstName);
        const colorSecondHalf = convertLetterToHex(lastName);
        const itemClassName =
          _id === projectInfo?.author ? 'UsersDropdown-item active' : 'UsersDropdown-item';

        const onClickHandler = async () => {
          setAuthor(fullName);
          setAuthorId(_id);
          setIsFocused(false);
        };

        return (
          <li className={itemClassName} key={_id} onClick={onClickHandler}>
            <UserAvatar
              className="UsersDropdown-avatar"
              content={fullName}
              color={`#${colorFirstHalf}${colorSecondHalf}`}
            />

            <p className="UsersDropdown-user-name">{fullName}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default UsersDropdown;
