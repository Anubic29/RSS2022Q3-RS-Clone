import { MdOutlineViewColumn as BoardIcon, MdSettings as SettingsIcon } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Styles from './AsideNavElement.module.scss';

interface AsideNavElementProps {
  title: string;
  id: 'aside-board' | 'aside-settings';
  isActive: boolean;
  link: 'board' | 'settings';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const iconsIds = {
  'aside-board': <BoardIcon className={Styles.Icon} />,
  'aside-settings': <SettingsIcon className={Styles.Icon} />
};

function AsideNavElement(props: AsideNavElementProps) {
  const { title, id, isActive, onClick, link } = props;
  const className = isActive ? Styles.AsideNavElementActive : Styles.AsideNavElement;

  return (
    <Link to={link} onClick={onClick} id={id}>
      <li className={className}>
        {iconsIds[id]}
        <span className={Styles.Title}>{title}</span>
      </li>
    </Link>
  );
}

export default AsideNavElement;
