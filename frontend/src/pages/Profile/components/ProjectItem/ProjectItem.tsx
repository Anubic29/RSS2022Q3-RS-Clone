import React from 'react';
import { Link } from 'react-router-dom';
import { BoxWithShadow, ProjectAvatar } from '../../../../components';

import styles from './ProjectItem.module.scss';

interface ProjectItemProps {
  id: string;
  title: string;
  pathImage: string;
  projKey: string;
}

function ProjectItem(props: ProjectItemProps) {
  return (
    <BoxWithShadow className={styles['project-item']}>
      <Link to={`/projects/${props.id}/board`} className={styles['link']}>
        <ProjectAvatar source={props.pathImage} className={styles['project-avatar']} />
        <span className={styles['info']}>
          <span className={styles['title']}>{props.title}</span>
          <span className={styles['key']}>{props.projKey}</span>
        </span>
      </Link>
    </BoxWithShadow>
  );
}

export default ProjectItem;
