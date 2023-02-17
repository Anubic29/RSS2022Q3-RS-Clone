import { InfoCard } from '../../../../components';
import Kanban from '../../../../assets/kanban.svg';
import TeamManaged from '../../../../assets/team-managed.svg';

import styles from './InfoCards.module.scss';

const INFO_CARDs_CUSTOM_BACKGROUND = {
  lightPurple: '#EAE6FF'
};

function InfoCards() {
  return (
    <div className={styles.InfoCards}>
      <div className={styles.Container}>
        <p className={styles.Subtitle}>Template</p>

        <InfoCard title="Kanban" src={Kanban} alt="Kanban">
          Get a visual representation of the project and work on it using tasks on the functional
          board.
        </InfoCard>
      </div>

      <div className={styles.Container}>
        <p className={styles.Subtitle}>Type</p>

        <InfoCard
          title="Managed by a team"
          src={TeamManaged}
          alt="Team managed"
          imgBackground={INFO_CARDs_CUSTOM_BACKGROUND.lightPurple}>
          Manage your own workflows and practices in an independent space.
        </InfoCard>
      </div>
    </div>
  );
}

export default InfoCards;
