import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MdExpandLess as AngleUp,
  MdExpandMore as AngleDown,
  MdSearch as SearchIcon
} from 'react-icons/md';
import { TeamTableDataRow } from '../';
import { useProjects, useUser } from '../../../../../contexts';
import { EmptyData, Input, Preloader } from '../../../../../components';
import { useAlerts } from '../../../../../contexts/AlertsContext';
import UserType from '../../../../../types/user/userType';

import './TeamTable.scss';

function TeamTable() {
  const { id: projectId } = useParams();
  const { currentUser, getUsers } = useUser();
  const { getProject, removeProjectCollaborator } = useProjects();
  const { addAlert } = useAlerts();

  const [sortOrder, setSortOrder] = useState('asc');
  const [collaborators, setCollaborators] = useState<UserType[]>([]);
  const [cachedCollaborators, setCachedCollaborators] = useState<UserType[]>([]);
  const [adminId, setAdminId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [customMessage, setCustomMessage] = useState('There are no collaborators');
  const [tableWidth, setTableWidth] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const fetchedProject = await getProject(projectId as string);
        const fetchedUsers = await getUsers();
        const usersIds = [...fetchedProject.team, currentUser?._id];
        const filteredUsers = usersIds
          .map((id) => fetchedUsers.find((user) => user._id === id))
          .filter((user) => user) as UserType[];
        const sortedUsersByDefault = filteredUsers.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );

        setAdminId(fetchedProject.author);
        setCollaborators(sortedUsersByDefault);
        setCachedCollaborators(sortedUsersByDefault);
      } catch {
        setCustomMessage('Server error');
        addAlert('Error', 'Server error. Unable to load collaborators');
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    setTableWidth(getTableWidth());
  }, []);

  const handleSortOrderChange = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

    setCollaborators((collaborators) =>
      collaborators.sort((a, b) =>
        sortOrder === 'asc'
          ? b.firstName.localeCompare(a.firstName)
          : a.firstName.localeCompare(b.firstName)
      )
    );
  };

  const handleCollaboratorsSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    setCollaborators(
      cachedCollaborators
        .filter((collaborator) => {
          const fullName = `${collaborator.firstName} ${collaborator.lastName}`;
          const email = collaborator.mail;

          return fullName.includes(event.target.value) || email.includes(event.target.value);
        })
        .sort((a, b) =>
          sortOrder === 'asc'
            ? b.firstName.localeCompare(a.firstName)
            : a.firstName.localeCompare(b.firstName)
        )
    );
  };

  const getTableWidth = () => {
    const upperDiv = document.querySelector('.TeamTable-info') as HTMLElement;

    return `${upperDiv.clientWidth}px`;
  };

  const handleRemoveCollaborator = async (event: React.MouseEvent) => {
    const { id } = event.target as HTMLElement;

    try {
      await removeProjectCollaborator(projectId as string, id);
      setCollaborators((collaborators) =>
        collaborators
          .filter((collaborator) => collaborator._id !== id)
          .sort((a, b) =>
            sortOrder === 'asc'
              ? a.firstName.localeCompare(b.firstName)
              : b.firstName.localeCompare(a.firstName)
          )
      );
    } catch {
      addAlert('Error', 'Server error. Unable to remove project collaborator');
    }
  };

  return (
    <>
      <div className="TeamTable-input-wrapper">
        <Input
          id="team-search"
          type="text"
          placeholder="Search by name or email"
          value={searchValue}
          onChange={handleCollaboratorsSearch}
        />

        <label className="TeamTable-search-icon-wrapper" htmlFor="team-search">
          <SearchIcon className="TeamTable-search-icon" />
        </label>
      </div>

      <div className="TeamTable-wrapper" style={{ width: tableWidth }}>
        <table className="TeamTable">
          <thead>
            <tr>
              <th
                className="TeamTable-header TeamTable-header-name"
                onClick={handleSortOrderChange}>
                Name
                {sortOrder === 'asc' ? <AngleUp /> : <AngleDown />}
              </th>
              <th className="TeamTable-header TeamTable-header-email">Email</th>
              <th className="TeamTable-header TeamTable-header-role">Role</th>
              <th className="TeamTable-header TeamTable-header-remove" />
            </tr>
          </thead>

          <tbody>
            {isLoaded ? (
              collaborators.length ? (
                collaborators.map((collaborator) => (
                  <TeamTableDataRow
                    key={collaborator._id}
                    collaborator={collaborator}
                    currentUserId={currentUser?._id as string}
                    adminId={adminId}
                    onRemove={handleRemoveCollaborator}
                  />
                ))
              ) : (
                <tr>
                  <td className="TeamTable-preloader-container">
                    <EmptyData text={customMessage} />
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td className="TeamTable-preloader-container">
                  <Preloader text="Loading collaborators..." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TeamTable;
