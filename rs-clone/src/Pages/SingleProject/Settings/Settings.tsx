import { Button, Dropdown, ProjectAvatar } from '../../../Components';
import cardsData from '../../../Data/FakeProjectCard';
import { SettingsBreadcrumbs, SettingsForm } from './Components';
import Styles from './Settings.module.scss';

function Settings() {
  const testData = cardsData[0];

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
        <Button className={Styles.ButtonAvatar}>Change avatar</Button>

        <SettingsForm />
      </div>
    </div>
  );
}

export default Settings;
