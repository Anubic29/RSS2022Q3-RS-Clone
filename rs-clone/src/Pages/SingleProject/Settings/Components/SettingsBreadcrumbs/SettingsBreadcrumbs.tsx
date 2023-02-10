import { Link } from 'react-router-dom';
import Styles from './SettingsBreadcrumbs.module.scss';

function SettingsBreadcrumbs() {
  return (
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
  );
}

export default SettingsBreadcrumbs;
