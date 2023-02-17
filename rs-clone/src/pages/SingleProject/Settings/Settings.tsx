import { Button, Dropdown, ProjectAvatar } from '../../../components';
import { useOverlay } from '../../../contexts';
import { ProjectBadgesPopup, SettingsBreadcrumbs, SettingsForm } from './components';
import cardsData from '../../../data/fakeProjectCard';

import styles from './Settings.module.scss';

const PROJECT_BADGE_SIZE = 128;

function Settings() {
  const testData = cardsData[0];
  const { setIsVisibleApp, setChildrenApp } = useOverlay();

  const showPopupHandler = () => {
    setChildrenApp(<ProjectBadgesPopup />);
    setIsVisibleApp(true);
  };

  return (
    <div className={styles.Settings}>
      <SettingsBreadcrumbs />

      <div className={styles.TitleArea}>
        <span className={styles.Title}>Details</span>

        <Dropdown
          childElements={[
            {
              title: 'Remove project',
              onClick: () => console.log(true)
            }
          ]}
        />
      </div>

      <div className={styles.ProjectDetails}>
        <ProjectAvatar {...testData} size={PROJECT_BADGE_SIZE} />

        <Button className={styles.ButtonAvatar} onClick={showPopupHandler}>
          Change avatar
        </Button>

        <SettingsForm />
      </div>
    </div>
  );
}

export default Settings;
