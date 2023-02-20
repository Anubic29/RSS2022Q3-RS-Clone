import { useMemo } from 'react';
import { Button, Dropdown, ProjectAvatar } from '../../../components';
import { useOverlay } from '../../../contexts';
import { ProjectBadgesPopup, SettingsBreadcrumbs, SettingsForm } from './components';
import { useBoard } from '../../../contexts/Board.context';
import Loader from '../../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

import styles from './Settings.module.scss';
import React from 'react';

const PROJECT_BADGE_SIZE = 128;

function Settings() {
  const { deleteProject, projectInfo } = useBoard();
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();
  const navigate = useNavigate();

  const showPopupHandler = () => {
    setChildrenBoard(<ProjectBadgesPopup />);
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
        <ProjectAvatar
          source={projectInfo?.pathImage ?? ''}
          bgColor={projectInfo?.color ?? 'transparent'}
          size={PROJECT_BADGE_SIZE}
        />
        <Button className={styles.ButtonAvatar} onClick={showPopupHandler}>
          Change avatar
        </Button>

        <SettingsForm />
      </div>
    </div>
  );
}

export default Settings;
