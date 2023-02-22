import { useMemo, useState } from 'react';
import { Button, Dropdown, ProjectAvatar } from '../../../components';
import { useOverlay } from '../../../contexts';
import { ProjectBadgesPopup, SettingsBreadcrumbs, SettingsForm } from './components';
import { useBoard } from '../../../contexts/Board.context';
import Loader from '../../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useAlerts } from '../../../contexts/AlertsContext';

import styles from './Settings.module.scss';

const PROJECT_BADGE_SIZE = 128;

function Settings() {
  const { deleteProject, projectInfo } = useBoard();
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();
  const [imageSrc, setImageSrc] = useState(projectInfo?.pathImage || '');
  const [imageBg, setImageBg] = useState(projectInfo?.color || '');
  const { addAlert } = useAlerts();
  const navigate = useNavigate();

  const showPopupHandler = () => {
    setChildrenBoard(
      <ProjectBadgesPopup setImageSrc={setImageSrc} setImageBg={setImageBg} imageSrc={imageSrc} />
    );
    setIsVisibleBoard(true);
  };

  const optionsBtnMenu = useMemo(() => {
    return [
      {
        title: 'Remove',
        onClick: async () => {
          setChildrenBoard(<Loader />);
          setIsVisibleBoard(true);
          await deleteProject();
          setIsVisibleBoard(false);
          navigate('/');
          addAlert('Success', 'Project was deleted successfully');
        }
      }
    ];
  }, [deleteProject]);

  return (
    <div className={styles.Settings}>
      <SettingsBreadcrumbs />

      <div className={styles.TitleArea}>
        <span className={styles.Title}>Details</span>
        <Dropdown childElements={optionsBtnMenu} />
      </div>

      <div className={styles.ProjectDetails}>
        <ProjectAvatar source={imageSrc} bgColor={imageBg} size={PROJECT_BADGE_SIZE} />
        <Button className={styles.ButtonAvatar} onClick={showPopupHandler}>
          Change avatar
        </Button>

        <SettingsForm imageSrc={imageSrc} imageBg={imageBg} />
      </div>
    </div>
  );
}

export default Settings;
