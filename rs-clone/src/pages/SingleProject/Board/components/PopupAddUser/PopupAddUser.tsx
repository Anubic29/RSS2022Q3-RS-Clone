import { useCallback, useEffect, useState } from 'react';
import { Input, UserAvatar, Loader, Preloader } from '../../../../../components';
import { useOverlay, useBoard } from '../../../../../contexts';
import { MdCancel, MdSearch } from 'react-icons/md';
import UserType from '../../../../../types/user/userType';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';
import api from '../../../../../api';

import styles from './PopupAddUser.module.scss';

function PopupAddUser() {
  const { addUserToTeam, getUserList } = useBoard();
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value.trim().length > 0) {
      (async () => {
        setIsLoading(true);
        const usersId = getUserList().map((data) => data._id);
        const response = await api.users.getAllData(`?value=${value}&limit=5`);
        if (response.status === 200) {
          const users = response.data.filter((user) => !usersId.includes(user._id));
          if (users.length === 1 && users[0].mail === value) setUserList([]);
          else setUserList(users);
        } else setUserList([]);
        setIsLoading(false);
      })();
    } else setUserList([]);
  }, [value]);

  const onSubmitHandler = useCallback(async () => {
    if (selectedUser) {
      setChildrenBoard(<Loader />);
      await addUserToTeam(selectedUser._id);
      setIsVisibleBoard(false);
    }
  }, [selectedUser]);

  return (
    <div className={styles['pop-up']}>
      <div className={styles['pop-up__title']}>Add user to project</div>
      <div className={styles['pop-up__content']}>
        {!selectedUser && (
          <div className={styles['form']}>
            <Input
              value={value}
              className={styles['input']}
              id="add-user-input"
              type="text"
              required
              onChange={(event) => setValue(event.target.value)}
              placeholder="Enter user name / mail"
            />
            <div className={styles['icon']}>
              <MdSearch />
            </div>
            {isLoading && (
              <div className={styles['user-list']}>
                <div className={styles['loader']}>
                  <Preloader />
                </div>
              </div>
            )}
            {userList.length > 0 && !isLoading && (
              <div className={styles['user-list']}>
                {userList.map((user) => (
                  <div
                    className={styles['user-item']}
                    key={user._id}
                    onClick={() => setSelectedUser(user)}>
                    <div className={styles['avatar']}>
                      <UserAvatar
                        content={user.firstName[0] + user.lastName[0]}
                        color={`#${convertLetterToHex(
                          user.firstName[0],
                          3,
                          '9'
                        )}${convertLetterToHex(user.lastName[0], 3, '9')}`}
                      />
                    </div>
                    {`${user.firstName} ${user.lastName}`}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {selectedUser && (
          <div className={styles['selected-user-item']}>
            <div className={styles['avatar']}>
              <UserAvatar
                content={selectedUser.firstName[0] + selectedUser.lastName[0]}
                color={`#${convertLetterToHex(
                  selectedUser.firstName[0],
                  3,
                  '9'
                )}${convertLetterToHex(selectedUser.lastName[0], 3, '9')}`}
              />
            </div>
            {`${selectedUser.firstName} ${selectedUser.lastName}`}
            <div className={styles['btn-block']} onClick={() => setSelectedUser(undefined)}>
              <MdCancel />
            </div>
          </div>
        )}
      </div>
      <div className={styles['pop-up__btns-block']}>
        <div
          className={`${styles['btn-block']} ${
            selectedUser ? styles['btn-block--primary'] : styles['blocked']
          }`}
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
