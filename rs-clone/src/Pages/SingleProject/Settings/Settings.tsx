import { useContext } from 'react';
import { Button, Dropdown, ProjectAvatar } from '../../../Components';
import { OverlayContext } from '../../../contexts';
import cardsData from '../../../Data/FakeProjectCard';
import { ProjectBadgesPopup, SettingsBreadcrumbs, SettingsForm } from './Components';
import Styles from './Settings.module.scss';

function Settings() {
  const testData = cardsData[0];
  const { setIsVisible, setChildren } = useContext(OverlayContext);

  const showPopupHandler = () => {
    setChildren(<ProjectBadgesPopup />);
    setIsVisible(true);
  };

  return (
    <div className={Styles.Settings}>
      <SettingsBreadcrumbs />

      <div className={Styles.TitleArea}>
        <span className={Styles.Title}>Details</span>
        <Dropdown
          childElements={[
            {
              title: 'Remove project',
              onClick: () => console.log(true)
            }
          ]}
        />
      </div>

      <div className={Styles.ProjectDetails}>
        <ProjectAvatar {...testData} size={128} />
        <Button className={Styles.ButtonAvatar} onClick={showPopupHandler}>
          Change avatar
        </Button>

        <SettingsForm />
      </div>
    </div>
  );
}

export default Settings;
