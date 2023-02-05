import { Route, Routes } from 'react-router-dom';
import { App } from '../Components';
import { Dashboard, NotFound, Projects } from '../Pages';

function AuthRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoute;
