import React, { useState } from 'react';
import { Preloader, UserAvatar } from '../../../../../components';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';
import { useAlerts } from '../../../../../contexts/AlertsContext';
import UserType from '../../../../../types/user/userType';

import './TeamTableDataRow.scss';

interface TeamTableDataRowProps {
  collaborator: UserType;
  currentUserId: string;
  adminId: string;
  onRemove: (event: React.MouseEvent) => Promise<void>;
}

function TeamTableDataRow(props: TeamTableDataRowProps) {
  const { collaborator, currentUserId, adminId, onRemove } = props;
  const { addAlert } = useAlerts();
  const [isLoaded, setIsLoaded] = useState(true);
  const colorFirstHalf = convertLetterToHex(collaborator.firstName[0]);
  const colorSecondHalf = convertLetterToHex(collaborator.lastName[0]);

  const handleRemove = async (event: React.MouseEvent) => {
    setIsLoaded(false);
    await onRemove(event);
    setIsLoaded(true);
    addAlert('Success', 'Collaborator was successfully removed from project');
  };

  return (
    <tr className="TeamTable-data-row">
      <td className="TeamTable-data TeamTable-data-user">
        <UserAvatar
          className="TeamTable-user-avatar"
          content={collaborator.firstName}
          color={`#${colorFirstHalf}${colorSecondHalf}`}
        />
        <p className="TeamTable-user-name">{`${collaborator.firstName} ${collaborator.lastName}`}</p>
      </td>

      <td className="TeamTable-data">
        <p className="TeamTable-user-email">{collaborator.mail}</p>
      </td>

      <td className="TeamTable-data">
        <p>{collaborator._id === adminId ? 'Admin' : 'Collaborator'}</p>
      </td>

      <td className="TeamTable-data">
        {collaborator._id !== currentUserId && currentUserId === adminId && (
          <span id={collaborator._id} className="TeamTable-remove" onClick={handleRemove}>
            Remove
          </span>
        )}
      </td>

      {!isLoaded && (
        <td className="TeamTable-row-preloader-container">
          <Preloader />
        </td>
      )}
    </tr>
  );
}

export default TeamTableDataRow;
