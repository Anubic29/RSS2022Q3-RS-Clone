import React from 'react';
import { EmptyData, UserAvatar } from '../../../../../components';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';
import UserType from '../../../../../types/user/userType';

import './UsersAddDropdown.scss';

interface UsersAddDropdownProps {
  users: UserType[];
  handleUserSelect: (useId: string) => void;
  selectedUserId: string;
}

function UsersAddDropdown(props: UsersAddDropdownProps) {
  const { users, handleUserSelect, selectedUserId } = props;

  return (
    <ul className="UsersAddDropdown">
      {users.length ? (
        users.map((user) => {
          const { firstName, lastName, _id } = user;
          const fullName = `${firstName} ${lastName}`;
          const colorFirstHalf = convertLetterToHex(firstName);
          const colorSecondHalf = convertLetterToHex(lastName);
          const itemClassName =
            _id === selectedUserId ? 'UsersAddDropdown-item active' : 'UsersAddDropdown-item';

          const handleClick = () => {
            handleUserSelect(_id);
          };

          return (
            <li className={itemClassName} key={_id} onClick={handleClick}>
              <UserAvatar
                className="UsersAddDropdown-avatar"
                content={fullName}
                color={`#${colorFirstHalf}${colorSecondHalf}`}
              />

              <div className="UsersAddDropdown-user-info">
                <p className="UsersAddDropdown-user-name">{fullName}</p>
                {_id === selectedUserId && (
                  <p className="UsersAddDropdown-user-selected">selected</p>
                )}
              </div>
            </li>
          );
        })
      ) : (
        <div className="UsersAddDropdown-empty">
          <EmptyData text="No matches" />
        </div>
      )}
    </ul>
  );
}

export default UsersAddDropdown;
