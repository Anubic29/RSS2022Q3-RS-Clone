import { Button } from '../../../../../components';
import { useOverlay } from '../../../../../contexts';
import projectBadges from '../../../../../data/projectBadges';

import styles from './ProjectBadgesPopup.module.scss';

function ProjectBadgesPopup() {
  const { setIsVisibleApp } = useOverlay();

  const onClickHandler = () => setIsVisibleApp(false);

  return (
    <div className={styles.ProjectBadgesPopup}>
      <p className={styles.Title}>Choose badge</p>

      <ul className={styles.BadgesList}>
        {projectBadges.map((badge) => {
          return (
            <li className={styles.BadgeItem} key={badge.id}>
              <img className={styles.Badge} src={badge.src} alt="Project badge" />
            </li>
          );
        })}
      </ul>

      <div className={styles.Buttons}>
        <Button>Choose</Button>
        <Button className={styles.ButtonCancel} onClick={onClickHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ProjectBadgesPopup;
