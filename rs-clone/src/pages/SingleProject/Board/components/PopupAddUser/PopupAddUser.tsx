import { useCallback, useEffect, useState } from 'react';
import { Input, UserAvatar } from '../../../../../components';
import { useBoard } from '../../../../../contexts/Board.context';
import { useOverlay } from '../../../../../contexts';
import { MdCancel, MdSearch } from 'react-icons/md';
import UserType from '../../../../../types/user/userType';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';

import styles from './PopupAddUser.module.scss';
import api from '../../../../../api';

function PopupAddUser() {
  const { addUserToTeam, getUserList } = useBoard();
  const { setIsVisibleBoard } = useOverlay();
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (selectedUser) setValue(selectedUser.mail);
  }, [selectedUser]);

  useEffect(() => {
    if (value.length > 0) {
      (async () => {
        const usersId = getUserList().map((data) => data._id);
        const response = await api.users.getAllData(`?mail=${value}&limit=5`);
        if (response.status === 200) {
          const users = response.data.filter((user) => !usersId.includes(user._id));
          if (users.length === 1 && users[0].mail === value) setUserList([]);
          else setUserList(users);
        } else setUserList([]);
      })();
    } else setUserList([]);
    if (selectedUser && selectedUser.mail !== value) setSelectedUser(undefined);
  }, [value]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmitHandler = useCallback(() => {
    if (selectedUser) {
      addUserToTeam(selectedUser._id);
      setIsVisibleBoard(false);
    }
  }, [selectedUser]);

  return (
    <div className={styles['pop-up']}>
      <div className={styles['pop-up__title']}>Add user to project</div>
      <div className={styles['pop-up__content']}>
        <div className={styles['form']}>
          <Input
            value={value}
            className={styles['input']}
            id="add-user-input"
            type="text"
            required
            onChange={onChangeHandler}
            placeholder="Enter user mail"
          />
          <div className={styles['icon']}>
            <MdSearch />
          </div>
          {userList.length > 0 && (
            <div className={styles['user-list']}>
              {userList.map((user) => (
                <div
                  className={styles['user-item']}
                  key={user._id}
                  onClick={() => setSelectedUser(user)}>
                  <div className={styles['avatar']}>
                    <UserAvatar
                      content={user.firstName[0] + user.lastName[0]}
                      color={`#${convertLetterToHex(user.firstName[0], 3, '9')}${convertLetterToHex(
                        user.lastName[0],
                        3,
                        '9'
                      )}`}
                    />
                  </div>
                  {`${user.firstName} ${user.lastName}`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles['pop-up__btns-block']}>
        <div
          className={styles['btn-block'] + ' ' + styles['btn-block--primary']}
          onClick={onSubmitHandler}>
          Add
        </div>
        <div className={styles['btn-block']} onClick={() => setIsVisibleBoard(false)}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default PopupAddUser;
