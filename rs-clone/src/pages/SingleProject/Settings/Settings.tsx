import { useEffect, useMemo } from 'react';
import { Button, Dropdown, ProjectAvatar } from '../../../components';
import { useOverlay } from '../../../contexts';
import { ProjectBadgesPopup, SettingsBreadcrumbs, SettingsForm } from './components';
import { useBoard } from '../../../contexts/Board.context';
import { ProjectId } from '../../../data/fakeProjectPageData';
import Loader from '../../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

import Styles from './Settings.module.scss';

function Settings() {
  const { setProjectDataBack, deleteProject, projectInfo } = useBoard();
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();
  const navigate = useNavigate();

  useEffect(() => {
    setProjectDataBack(ProjectId);
  }, []);

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
    <div className={Styles.Settings}>
      <SettingsBreadcrumbs />

      <div className={Styles.TitleArea}>
        <span className={Styles.Title}>Details</span>
        <Dropdown childElements={optionsBtnMenu} />
      </div>

      <div className={Styles.ProjectDetails}>
        <ProjectAvatar
          source={projectInfo?.pathImage ?? ''}
          bgColor={projectInfo?.color ?? 'transparent'}
          size={128}
        />
        <Button className={Styles.ButtonAvatar} onClick={showPopupHandler}>
          Change avatar
        </Button>

        <SettingsForm />
      </div>
    </div>
  );
}

export default Settings;
