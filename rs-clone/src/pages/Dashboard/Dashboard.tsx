import { ProjectsSection, TasksSection } from './components';

import styles from './Dashboard.module.scss';

function Dashboard() {
  return (
    <main className={styles.Dashboard}>
      <h1 className={styles.DashboardTitle}>Your work</h1>

      <ProjectsSection />
      <TasksSection />
    </main>
  );
}

export default Dashboard;
