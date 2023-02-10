import { useContext } from 'react';
import { Button } from '../../../../../Components';
import { OverlayContext } from '../../../../../contexts';
import projectBadges from '../../../../../Data/project-badges';
import Styles from './ProjectBadgesPopup.module.scss';

function ProjectBadgesPopup() {
  const { setIsVisible } = useContext(OverlayContext);

  const onClickHandler = () => {
    setIsVisible(false);
  };

  return (
    <div className={Styles.ProjectBadgesPopup}>
      <p className={Styles.Title}>Choose badge</p>
      <ul className={Styles.BadgesList}>
        {projectBadges.map((badge) => {
          return (
            <li className={Styles.BadgeItem} key={badge.id}>
              <img className={Styles.Badge} src={badge.src} alt="Project badge" />
            </li>
          );
        })}
      </ul>
      <div className={Styles.Buttons}>
        <Button>Choose</Button>
        <Button className={Styles.ButtonCancel} onClick={onClickHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ProjectBadgesPopup;
