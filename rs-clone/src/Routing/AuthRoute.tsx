import { Route, Routes } from 'react-router-dom';
import { App } from '../Components';
import { Dashboard, NotFound, ProjectCreate, Projects, SingleProject } from '../Pages';

function AuthRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<SingleProject />} />
      </Route>
      <Route path="create-project" element={<ProjectCreate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoute;
