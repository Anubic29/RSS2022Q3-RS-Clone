import { Link } from 'react-router-dom';
import { Button, DropdownButton, ProjectAvatar } from '../../../Components';
import cardsData from '../../../Data/FakeProjectCard';
import { SettingsForm } from './Components';
import Styles from './Settings.module.scss';

function Settings() {
  const testData = cardsData[0];

  return (
    <div className={Styles.Settings}>
      <ul className={Styles.Breadcrumbs}>
        <li className={Styles.Breadcrumb}>
          <Link to="/">Homepage</Link>
        </li>
        <span className={Styles.Divider}>/</span>
        <li className={Styles.Breadcrumb}>
          <Link to="/projects">Projects</Link>
        </li>
        <span className={Styles.Divider}>/</span>
        <li className={Styles.Breadcrumb}>Project settings</li>
      </ul>

      <div className={Styles.TitleArea}>
        <span className={Styles.Title}>Details</span>
        <DropdownButton />
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
