import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoCards, ProjectForm } from './components';
import { Button } from '../../components';
import { getCurrentUserId } from '../../api/allProjects';
import { getRandomNum } from '../../utils';
import { projectBadges } from '../../data';
import { useProjects } from '../../contexts';
import { ProjectsContextValue } from '../../contexts/ProjectsContext';

import styles from './ProjectCreate.module.scss';

enum InputIds {
  NAME = 'name',
  KEY = 'key',
  DESCRIPTION = 'description'
}

const BADGE_MIN_INDEX = 0;
const BADGE_MAX_INDEX = 25;

function ProjectCreate() {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { createProject } = useProjects() as ProjectsContextValue;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === InputIds.NAME) {
      setName(value);
    } else if (id === InputIds.KEY) {
      setKey(value);
    } else if (id === InputIds.DESCRIPTION) {
      setDescription(value);
    }
  };

  const onCreateHandler = async () => {
    const userId = await getCurrentUserId();
    const randomNum = getRandomNum(BADGE_MIN_INDEX, BADGE_MAX_INDEX);
    const badge = projectBadges[randomNum];
    const { src, bg } = badge;

    await createProject({
      description,
      key,
      title: name,
      author: userId,
      pathImage: src,
      color: bg
    });

    navigate('/');
  };

  const onCancelHandler = () => navigate('/');

  return (
    <section className={styles.ProjectCreate}>
      <div className={styles.Container}>
        <div className={styles.Row}>
          <div className={styles.Col}>
            <h1 className={styles.Title}>Add information about project</h1>
            <p className={styles.Subtitle}>You can edit information anytime in project settings</p>

            <ProjectForm
              projectName={name}
              projectKey={key}
              projectDescription={description}
              onChange={onChangeHandler}
            />
          </div>

          <div className={styles.ColRight}>
            <InfoCards />
          </div>
        </div>

        <div className={styles.RowBottom}>
          <Button className={styles.ButtonCancel} onClick={onCancelHandler}>
            Cancel
          </Button>
          <Button onClick={onCreateHandler}>Create project</Button>
        </div>
      </div>
    </section>
  );
}

export default ProjectCreate;
