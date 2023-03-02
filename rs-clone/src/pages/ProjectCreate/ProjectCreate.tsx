import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoCards, ProjectForm } from './components';
import { Button, Preloader } from '../../components';
import { useAlerts } from '../../contexts';

import styles from './ProjectCreate.module.scss';

const FORM_ID = 'project-create-form';

function ProjectCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { alerts } = useAlerts();

  const onCancelHandler = () => {
    navigate('/');
  };

  return (
    <section className={styles.ProjectCreate}>
      {isLoading && (
        <div className={styles.PreloaderContainer}>
          <Preloader text="Creating project..." />
        </div>
      )}

      <div className={styles.Container}>
        <div className={styles.Row}>
          <div className={styles.Col}>
            <h1 className={styles.Title}>Add information about project</h1>
            <p className={styles.Subtitle}>You can edit information anytime in project settings</p>

            <ProjectForm id={FORM_ID} setLoader={setIsLoading} />
          </div>

          <div className={styles.ColRight}>
            <InfoCards />
          </div>
        </div>

        <div className={styles.RowBottom}>
          <Button className={styles.ButtonCancel} onClick={onCancelHandler}>
            Cancel
          </Button>
          <Button form={FORM_ID}>Create project</Button>
        </div>
      </div>

      {!!alerts.length && <div className="AlertsContainer">{alerts}</div>}
    </section>
  );
}

export default ProjectCreate;
