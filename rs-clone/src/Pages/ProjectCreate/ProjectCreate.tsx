import { Link } from 'react-router-dom';
import { Button } from '../../Components';
import { InfoCards, ProjectForm } from './Components';
import React, { useState } from 'react';
import { createProject, getCurrentUserId } from '../../api/allProjects';
import getRandomNum from '../../utils/getRandomNum';
import projectBadges from '../../Data/project-badges';
import Styles from './ProjectCreate.module.scss';

function ProjectCreate() {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'name') {
      setName(event.target.value);
    }
    if (event.target.id === 'key') {
      setKey(event.target.value);
    }
    if (event.target.id === 'description') {
      setDescription(event.target.value);
    }
  };

  const onClickHandler = async () => {
    const randomNum = getRandomNum(0, 25);
    const badge = projectBadges[randomNum];
    const userId = await getCurrentUserId();

    await createProject({
      title: name,
      description,
      author: userId,
      pathImage: badge.src,
      color: badge.bg,
      key
    });
  };

  return (
    <div className={Styles.ProjectCreate}>
      <div className={Styles.Container}>
        <div className={Styles.Row}>
          <div className={Styles.Col}>
            <h1 className={Styles.Title}>Add information about project</h1>
            <p className={Styles.Subtitle}>You can edit information anytime in project settings</p>
            <ProjectForm
              projectName={name}
              projectKey={key}
              projectDescription={description}
              onChange={onChangeHandler}
            />
          </div>
          <div className={Styles.ColRight}>
            <InfoCards />
          </div>
        </div>
        <div className={Styles.RowBottom}>
          <Link to="/">
            <Button className={Styles.ButtonCancel}>Cancel</Button>
          </Link>
          <Button onClick={onClickHandler}>Create project</Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCreate;
