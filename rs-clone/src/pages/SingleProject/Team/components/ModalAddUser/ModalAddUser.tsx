import React, { useEffect, useState } from 'react';
import { Button, Input, Preloader, UserAvatar } from '../../../../../components';
import { MdSearch as SearchIcon, MdAccountCircle as UserIcon } from 'react-icons/md';
import { useAlerts, useBoard, useOverlay, useProjects } from '../../../../../contexts';
import { UsersAddDropdown } from '../index';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';
import UserType from '../../../../../types/user/userType';

import './ModalAddUser.scss';

function ModalAddUser() {
  const { getUsers } = useProjects();
  const { projectInfo, addUserToTeam } = useBoard();
  const { setIsVisibleBoard } = useOverlay();
  const { addAlert } = useAlerts();

  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserFullName, setSelectedUserFullName] = useState('');
  const [selectedUserColor, setSelectedUserColor] = useState('');
  const [isLoaded, setIsLoaded] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      setIsLoaded(false);

      try {
        const fetchedUsers = await getUsers();
        const currentProjectCollaborators = projectInfo?.team;
        const admin = projectInfo?.author;
        const filteredUsersByCurrentProjectExistence = fetchedUsers.filter(
          (user) => !currentProjectCollaborators?.includes(user._id) && user._id !== admin
        );

        setAllUsers(filteredUsersByCurrentProjectExistence);
        setUsers(filteredUsersByCurrentProjectExistence);
      } catch {
        setIsVisibleBoard(false);
        addAlert('Error', 'Server error. Unable to load users');
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [projectInfo]);

  useEffect(() => {
    window.addEventListener('click', handleDropdownVisibility);

    return () => {
      window.removeEventListener('click', handleDropdownVisibility);
    };
  }, []);

  const handleDropdownVisibility = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const input = target.closest('.ModalAddUser-input-search');

    if (input) {
      setDropdownIsVisible(true);
      setSearchValue('');
    } else {
      setDropdownIsVisible(false);
    }
  };

  const handleUserSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredUsersBySearchValue = allUsers.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      const email = user.mail;

      return fullName.includes(value) || email.includes(value);
    });

    setSearchValue(value);
    setUsers(filteredUsersBySearchValue);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedUserId) {
      setIsLoaded(false);

      try {
        await addUserToTeam(selectedUserId);
        addAlert('Success', 'Collaborator was successfully added to project');
        setIsVisibleBoard(false);
      } catch {
        addAlert('Error', 'Server error. Unable to add collaborator');
      } finally {
        setIsLoaded(true);
      }
    }
  };

  const handleModalClose = () => {
    setIsVisibleBoard(false);
  };

  const handleUserSelect = (userId: string) => {
    const selectedUser = users.find((user) => user._id === userId);
    const fullName = `${selectedUser?.firstName} ${selectedUser?.lastName}`;
    const colorFirstHalf = convertLetterToHex(selectedUser?.firstName as string);
    const colorSecondHalf = convertLetterToHex(selectedUser?.lastName as string);

    setSearchValue(fullName);

    setSelectedUserId(userId);
    setSelectedUserFullName(fullName);
    setSelectedUserColor(`#${colorFirstHalf}${colorSecondHalf}`);
  };

  return (
    <div className="ModalAddUser">
      <p className="ModalAddUser-title">Add collaborator</p>

      <form className="ModalAddUser-form" onSubmit={handleFormSubmit}>
        <fieldset className="ModalAddUser-input-wrapper">
          <Input
            className="ModalAddUser-input-search"
            id="search-user"
            type="text"
            placeholder="Search by name or email"
            value={dropdownIsVisible ? searchValue : selectedUserFullName}
            onChange={handleUserSearch}
            style={{ paddingLeft: dropdownIsVisible || selectedUserId ? '40px' : '6px' }}
          />

          <label className="ModalAddUser-user-avatar-wrapper" htmlFor="search-user">
            {dropdownIsVisible ? (
              <UserIcon className="ModalAddUser-user-icon" />
            ) : (
              selectedUserId && (
                <UserAvatar
                  className="ModalAddUser-user-avatar"
                  content={selectedUserFullName}
                  color={selectedUserColor}
                />
              )
            )}
          </label>

          <label className="ModalAddUser-search-icon-wrapper" htmlFor="search-user">
            <SearchIcon className="ModalAddUser-search-icon" />
          </label>

          {dropdownIsVisible && (
            <UsersAddDropdown
              users={users}
              handleUserSelect={handleUserSelect}
              selectedUserId={selectedUserId}
            />
          )}
        </fieldset>

        <fieldset className="ModalAddUser-input-wrapper">
          <Button className="ModalAddUser-button-cancel" type="button" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </fieldset>
      </form>

      {!isLoaded && (
        <div className="ModalAddUser-preloader">
          <Preloader />
        </div>
      )}
    </div>
  );
}

export default ModalAddUser;
