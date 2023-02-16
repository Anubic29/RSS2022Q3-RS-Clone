import { Route, Routes, Navigate } from 'react-router-dom';
import { App } from '../Components';
import { BoardProvider } from '../contexts/Board.context';
import {
  Dashboard,
  NotFound,
  ProjectCreate,
  Projects,
  Board,
  Settings,
  SingleProject
} from '../Pages';
import { ProjectsProvider } from '../contexts';

function AuthRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProjectsProvider>
            <App />
          </ProjectsProvider>
        }>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sign-in" element={<Navigate to={'/'} />} />
        <Route path="sign-up" element={<Navigate to={'/'} />} />
        <Route path="projects" element={<Projects />} />
        <Route
          path="projects/:id"
          element={
            <BoardProvider>
              <SingleProject />
            </BoardProvider>
          }>
          <Route index element={<Board />} />
          <Route path="board" element={<Board />} />
          <Route path="selected-task/:taskId" element={<Board />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="create-project" element={<ProjectCreate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoute;
