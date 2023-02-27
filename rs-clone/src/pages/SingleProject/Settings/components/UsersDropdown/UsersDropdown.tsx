import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useBoard } from '../../../../../contexts';
import { EmptyData, UserAvatar } from '../../../../../components';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';
import UserType from '../../../../../types/user/userType';

import './UsersDropdown.scss';

interface UsersDropdownProps {
  search: string;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setAuthor: Dispatch<SetStateAction<string>>;
  setAuthorId: Dispatch<SetStateAction<string>>;
  setSelectedUser: Dispatch<SetStateAction<string>>;
  selectedUser: string;
}

function UsersDropdown(props: UsersDropdownProps) {
  const { setIsFocused, setAuthor, setAuthorId, search, selectedUser, setSelectedUser } = props;
  const { getUserList, projectInfo } = useBoard();
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    setUsers(
      getUserList().filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;

        return fullName.includes(search);
      })
    );
  }, [search]);

  return (
    <ul className="UsersDropdown">
      {users.length ? (
        users.map((user) => {
          const { firstName, lastName, _id } = user;
          const fullName = `${firstName} ${lastName}`;
          const colorFirstHalf = convertLetterToHex(firstName);
          const colorSecondHalf = convertLetterToHex(lastName);
          const itemClassName =
            _id === selectedUser ? 'UsersDropdown-item active' : 'UsersDropdown-item';

          const onClickHandler = async () => {
            setAuthor(fullName);
            setAuthorId(_id);
            setSelectedUser(_id);
            setIsFocused(false);
          };

          return (
            <li className={itemClassName} key={_id} onClick={onClickHandler}>
              <UserAvatar
                className="UsersDropdown-avatar"
                content={fullName}
                color={`#${colorFirstHalf}${colorSecondHalf}`}
              />

              <div className="UsersDropdown-user-info">
                <p className="UsersDropdown-user-name">{fullName}</p>
                {_id === projectInfo?.author && (
                  <p className="UsersDropdown-user-is-admin">admin</p>
                )}
              </div>
            </li>
          );
        })
      ) : (
        <div className="UsersDropdown-empty">
          <EmptyData text="No matches" />
        </div>
      )}
    </ul>
  );
}

export default UsersDropdown;
