import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setOverlayContent, hideOverlay } from '../../../redux/overlaySlice';
import { removeUserFromProject } from '../../../redux/projectSlice';
import { removeProject } from '../../../redux/projectsSlice';
import { BtnMenuAction, Loader } from '../../../components';
import { ProjectBreadcrumbs } from '../components';
import { SettingsForm } from './components';

import styles from './Settings.module.scss';

function Settings() {
  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const currentProject = useSelector((state: RootState) => state.projectSlice.project);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const optionsBtnMenu = useMemo(() => {
    const isAuthor = currentUser && currentProject && currentUser._id === currentProject.author;

    return [
      {
        title: isAuthor ? 'Remove Project' : 'Leave Project',
        callback: () => {
          if (currentUser && currentProject) {
            dispatch(setOverlayContent(<Loader />));
            if (isAuthor) dispatch(removeProject(currentProject._id));
            else dispatch(removeUserFromProject(currentProject._id, currentUser._id));
            dispatch(hideOverlay());
            navigate('/');
          }
        }
      }
    ];
  }, [currentUser?._id, currentProject?._id, currentProject?.author]);

  return (
    <>
      <ProjectBreadcrumbs endPoint="Project settings" />

      <div className={styles['settings-header']}>
        <h3 className={styles['title']}>Details</h3>
        <BtnMenuAction options={optionsBtnMenu} btnClassType="second" />
      </div>

      <SettingsForm />
    </>
  );
}

export default Settings;
