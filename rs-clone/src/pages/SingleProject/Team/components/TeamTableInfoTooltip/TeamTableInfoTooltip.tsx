import React from 'react';

import './TeamTableInfoTooltip.scss';

function TeamTableInfoTooltip() {
  return (
    <div className="TeamTable-info">
      <div className="TeamTable-info-icon">i</div>
      <p className="TeamTable-info-message">
        <span>Only user with</span>
        <span className="TeamTable-info-message-marked"> Admin </span>
        <span>role can remove other users from collaborators.</span>
        <span className="TeamTable-info-message-marked"> Admin </span>
        <span>
          is those user who created project. It is not possible to change users roles now, because
          according functionality is not implemented yet, but you can delegate
        </span>
        <span className="TeamTable-info-message-marked"> Admin </span>
        <span>role in project settings</span>
      </p>
    </div>
  );
}

export default TeamTableInfoTooltip;
