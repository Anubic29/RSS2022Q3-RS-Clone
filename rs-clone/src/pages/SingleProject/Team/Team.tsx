import React from 'react';
import { Button } from '../../../components';
import { TeamBreadcrumbs, TeamTable } from './components';

import styles from './Team.module.scss';

function Team() {
  return (
    <div className={styles.Team}>
      <TeamBreadcrumbs />

      <div className={styles.TitleArea}>
        <span className={styles.Title}>Collaborators</span>
        <Button>Add user to team</Button>
      </div>

      <div className={styles.TeamDetails}>
        <div className="TeamTable-info">
          <div className="TeamTable-info-icon">i</div>
          <p className="TeamTable-info-message">
            <span>Only user with</span>
            <span className="TeamTable-info-message-marked"> Admin </span>
            <span>role can remove other users from collaborators.</span>
            <span className="TeamTable-info-message-marked"> Admin </span>
            <span>
              is those user who created project. It is not possible to change users roles now,
              because according functionality is not implemented yet, but you can delegate
            </span>
            <span className="TeamTable-info-message-marked"> Admin </span>
            <span>role in project settings</span>
          </p>
        </div>

        <div className={styles.TableWrapper}>
          <TeamTable />
        </div>
      </div>
    </div>
  );
}

export default Team;
