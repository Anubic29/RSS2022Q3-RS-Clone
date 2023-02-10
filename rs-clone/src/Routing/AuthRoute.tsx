import { Route, Routes, Navigate } from 'react-router-dom';
import { App } from '../Components';
import { Dashboard, NotFound, ProjectCreate, Projects, Settings, SingleProject } from '../Pages';

function AuthRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sign-in" element={<Navigate to={'/'} />} />
        <Route path="sign-up" element={<Navigate to={'/'} />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<SingleProject />}>
          <Route index element={<h1>Board</h1>} />
          <Route path="board" element={<h1>Board</h1>} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="create-project" element={<ProjectCreate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoute;
