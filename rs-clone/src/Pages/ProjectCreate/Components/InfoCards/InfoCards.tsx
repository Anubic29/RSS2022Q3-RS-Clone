import { InfoCard } from '../../../../Components';
import Styles from './InfoCards.module.scss';
import Kanban from '../../../../assets/kanban.svg';
import TeamManaged from '../../../../assets/team-managed.svg';

function InfoCards() {
  return (
    <div className={Styles.InfoCards}>
      <div className={Styles.Container}>
        <p className={Styles.Subtitle}>Template</p>
        <InfoCard title="Kanban" src={Kanban} alt="Kanban">
          Get a visual representation of the project and work on it using tasks on the functional
          board.
        </InfoCard>
      </div>
      <div className={Styles.Container}>
        <p className={Styles.Subtitle}>Type</p>
        <InfoCard
          title="Managed by a team"
          src={TeamManaged}
          alt="Team managed"
          imgBackground="#EAE6FF">
          Manage your own workflows and practices in an independent space.
        </InfoCard>
      </div>
    </div>
  );
}

export default InfoCards;
