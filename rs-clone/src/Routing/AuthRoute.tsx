import { Route, Routes } from 'react-router-dom';
import { App } from '../Components';
<<<<<<< HEAD
import { Dashboard, NotFound, Projects, LoginPage } from '../Pages';
=======
import { Dashboard, NotFound, ProjectCreate, Projects } from '../Pages';
>>>>>>> develop

function AuthRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
      </Route>
      <Route path="create-project" element={<ProjectCreate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoute;
