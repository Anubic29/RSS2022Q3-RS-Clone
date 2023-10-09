import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarkedItemsList, ProjectsList, TasksList } from './components';

import styles from './Dashboard.module.scss';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('tasks');

  const tabList = useMemo(
    () => [
      {
        value: 'tasks',
        title: 'Assigned to you'
      },
      {
        value: 'marked',
        title: 'Marked'
      }
    ],
    []
  );

  return (
    <main className={styles['dashboard']}>
      <h1 className={styles['title']}>Your work</h1>

      <section className={styles['projects']}>
        <div className={styles['row']}>
          <h2 className={styles['title']}>All your projects</h2>
          <div className={styles['link-list']}>
            <Link className={styles['link']} to="/projects">
              All projects
            </Link>
            <Link className={styles['link']} to="/create-project">
              Create project
            </Link>
          </div>
        </div>
        <ProjectsList />
      </section>

      <section className={styles['tasks']}>
        <ul className={styles['tab-list']}>
          {tabList.map((tab) => (
            <li
              key={`tab-${tab.value}`}
              className={`${styles['tab']} ${activeTab === tab.value && styles['active']}`}
              onClick={() => setActiveTab(tab.value)}>
              {tab.title}
            </li>
          ))}
        </ul>

        <ul className={styles['list']}>
          {activeTab === 'tasks' && <TasksList />}
          {activeTab === 'marked' && <MarkedItemsList />}
        </ul>
      </section>
    </main>
  );
}

export default Dashboard;
