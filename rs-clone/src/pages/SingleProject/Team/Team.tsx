import React from 'react';
import { Button } from '../../../components';
import { ModalAddUser, TeamBreadcrumbs, TeamTable, TeamTableInfoTooltip } from './components';
import { useOverlay } from '../../../contexts';

import styles from './Team.module.scss';

function Team() {
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();

  const handleAddCollaborator = () => {
    setIsVisibleBoard(true);
    setChildrenBoard(<ModalAddUser />);
  };

  return (
    <div className={styles.Team}>
      <TeamBreadcrumbs />

      <div className={styles.TitleArea}>
        <span className={styles.Title}>Collaborators</span>

        <Button onClick={handleAddCollaborator}>Add collaborator</Button>
      </div>

      <div className={styles.TeamDetails}>
        <TeamTableInfoTooltip />

        <div className={styles.TableWrapper}>
          <TeamTable />
        </div>
      </div>
    </div>
  );
}

export default Team;
