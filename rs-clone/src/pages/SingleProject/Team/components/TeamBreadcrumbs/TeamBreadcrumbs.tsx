import React from 'react';
import { Link } from 'react-router-dom';

import styles from './TeamBreadcrumbs.module.scss';

function TeamBreadcrumbs() {
  return (
    <ul className={styles.Breadcrumbs}>
      <li className={styles.Breadcrumb}>
        <Link to="/">Homepage</Link>
      </li>

      <span className={styles.Divider}>/</span>

      <li className={styles.Breadcrumb}>
        <Link to="/projects">Projects</Link>
      </li>

      <span className={styles.Divider}>/</span>

      <li className={styles.Breadcrumb}>Project team</li>
    </ul>
  );
}

export default TeamBreadcrumbs;
