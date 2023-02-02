import ProjectsSection from './components/ProjectsSection/ProjectsSection';

import styles from './Dashboard.module.scss';

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Your work</h1>
      <ProjectsSection />
    </div>
  );
}

export default Dashboard;
