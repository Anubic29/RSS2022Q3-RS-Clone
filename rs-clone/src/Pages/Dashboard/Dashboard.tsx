import { ProjectsSection, TasksSection } from './Components';

import Styles from './Dashboard.module.scss';

function Dashboard() {
  return (
    <main className={Styles.Dashboard}>
      <h1 className={Styles.DashboardTitle}>Your work</h1>
      <ProjectsSection />
      <TasksSection />
    </main>
  );
}

export default Dashboard;
